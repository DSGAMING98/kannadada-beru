import { timingSafeEqual } from "node:crypto";
import { put } from "@vercel/blob";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { regionalAudioSubmissionSchema } from "@/lib/regional-audio-submission";

export const runtime = "nodejs";

function validInviteCode(value: string | null) {
  const expected = process.env.REGIONAL_AUDIO_CONTRIBUTION_CODE;
  if (!expected || !value) return false;
  const suppliedBuffer = Buffer.from(value, "utf8");
  const expectedBuffer = Buffer.from(expected, "utf8");
  return suppliedBuffer.length === expectedBuffer.length && timingSafeEqual(suppliedBuffer, expectedBuffer);
}

export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;
  try {
    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const requestOrigin = new URL(request.url).origin;
        const origin = request.headers.get("origin");
        if (origin && origin !== requestOrigin) throw new Error("Invalid upload origin.");
        if (!validInviteCode(request.headers.get("x-contributor-code"))) throw new Error("Invalid contributor access code.");
        if (!clientPayload) throw new Error("Submission metadata is required.");
        const submission = regionalAudioSubmissionSchema.parse(JSON.parse(clientPayload));
        if (!pathname.startsWith(`review-submissions/${submission.submissionId}/audio.`)) throw new Error("Invalid upload path.");
        return {
          allowedContentTypes: ["audio/*", "video/mp4", "application/ogg"],
          maximumSizeInBytes: 15 * 1024 * 1024,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify(submission),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        if (!tokenPayload) throw new Error("Submission metadata was not preserved.");
        const submission = regionalAudioSubmissionSchema.parse(JSON.parse(tokenPayload));
        await put(
          `review-submissions/${submission.submissionId}/metadata.json`,
          JSON.stringify({
            ...submission,
            website: undefined,
            status: "pending_human_review",
            receivedAt: new Date().toISOString(),
            audio: {
              pathname: blob.pathname,
              url: blob.url,
              contentType: blob.contentType,
            },
          }, null, 2),
          { access: "private", contentType: "application/json", allowOverwrite: true },
        );
      },
    });
    return Response.json(response, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Audio submission failed.";
    return Response.json({ error: message }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }
}
