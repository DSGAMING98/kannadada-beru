import { z } from "zod";
import { districtLearningProfiles, districtLearningSchema } from "@/lib/district-learning";

export const districtSchema = z.object({
  id: z.string().regex(/^ka-district-[a-z0-9-]+$/), slug: z.string().regex(/^[a-z0-9-]+$/), nameKannada: z.string().min(1), nameEnglish: z.string().min(1), formerNames: z.array(z.string()), headquarters: z.string().nullable(), officialDirectoryUrl: z.url(), currentStatusNote: z.string().min(1), learning: districtLearningSchema,
  geometry: z.object({ availability: z.enum(["historical-2011", "not-in-bundled-map"]), historicalFeatureName: z.string().nullable(), vintage: z.literal("Census 2011") }),
});
export type District = z.infer<typeof districtSchema>;

const directory = [
  ["bagalkote", "ಬಾಗಲಕೋಟೆ", "Bagalkote", ["Bagalkot"], "Bagalkote", "https://bagalkot.nic.in", "Bagalkot"],
  ["ballari", "ಬಳ್ಳಾರಿ", "Ballari", ["Bellary"], "Ballari", "https://ballari.nic.in", "Bellary"],
  ["belagavi", "ಬೆಳಗಾವಿ", "Belagavi", ["Belgaum"], "Belagavi", "https://belagavi.nic.in", "Belgaum"],
  ["bengaluru-rural", "ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ", "Bengaluru Rural", ["Bangalore Rural"], "Devanahalli", "https://bangalorerural.nic.in", "Bangalore Rural"],
  ["bengaluru-south", "ಬೆಂಗಳೂರು ದಕ್ಷಿಣ", "Bengaluru South", ["Ramanagara", "Bangalore South"], "Ramanagara", "https://bengalurusouth.nic.in", "Ramanagara"],
  ["bengaluru-urban", "ಬೆಂಗಳೂರು ನಗರ", "Bengaluru Urban", ["Bangalore"], "Bengaluru", "https://bengaluruurban.nic.in", "Bangalore"],
  ["bidar", "ಬೀದರ್", "Bidar", [], "Bidar", "https://bidar.nic.in", "Bidar"],
  ["chamarajanagar", "ಚಾಮರಾಜನಗರ", "Chamarajanagar", ["Chamrajnagar"], "Chamarajanagar", "https://chamrajnagar.nic.in", "Chamrajnagar"],
  ["chikkaballapur", "ಚಿಕ್ಕಬಳ್ಳಾಪುರ", "Chikkaballapur", ["Chikkaballapura"], "Chikkaballapur", "https://chikkaballapur.nic.in", "Chikkaballapura"],
  ["chikkamagaluru", "ಚಿಕ್ಕಮಗಳೂರು", "Chikkamagaluru", ["Chikmagalur"], "Chikkamagaluru", "https://chikkamagaluru.nic.in", "Chikmagalur"],
  ["chitradurga", "ಚಿತ್ರದುರ್ಗ", "Chitradurga", [], "Chitradurga", "https://chitradurga.nic.in", "Chitradurga"],
  ["dakshina-kannada", "ದಕ್ಷಿಣ ಕನ್ನಡ", "Dakshina Kannada", [], "Mangaluru", "https://dk.nic.in", "Dakshina Kannada"],
  ["davanagere", "ದಾವಣಗೆರೆ", "Davanagere", [], "Davanagere", "https://davanagere.nic.in", "Davanagere"],
  ["dharwad", "ಧಾರವಾಡ", "Dharwad", [], "Dharwad", "https://dharwad.nic.in", "Dharwad"],
  ["gadag", "ಗದಗ", "Gadag", [], "Gadag", "https://gadag.nic.in", "Gadag"],
  ["hassan", "ಹಾಸನ", "Hassan", [], "Hassan", "https://hassan.nic.in", "Hassan"],
  ["haveri", "ಹಾವೇರಿ", "Haveri", [], "Haveri", "https://haveri.nic.in", "Haveri"],
  ["kalaburagi", "ಕಲಬುರಗಿ", "Kalaburagi", ["Gulbarga"], "Kalaburagi", "https://kalaburagi.nic.in", "Gulbarga"],
  ["kodagu", "ಕೊಡಗು", "Kodagu", ["Coorg"], "Madikeri", "https://kodagu.nic.in", "Kodagu"],
  ["kolar", "ಕೋಲಾರ", "Kolar", [], "Kolar", "https://kolar.nic.in", "Kolar"],
  ["koppal", "ಕೊಪ್ಪಳ", "Koppal", [], "Koppal", "https://koppal.nic.in", "Koppal"],
  ["mandya", "ಮಂಡ್ಯ", "Mandya", [], "Mandya", "https://mandya.nic.in", "Mandya"],
  ["mysuru", "ಮೈಸೂರು", "Mysuru", ["Mysore"], "Mysuru", "https://mysore.nic.in", "Mysore"],
  ["raichur", "ರಾಯಚೂರು", "Raichur", [], "Raichur", "https://raichur.nic.in", "Raichur"],
  ["shivamogga", "ಶಿವಮೊಗ್ಗ", "Shivamogga", ["Shimoga"], "Shivamogga", "https://shivamogga.nic.in", "Shimoga"],
  ["tumakuru", "ತುಮಕೂರು", "Tumakuru", ["Tumkur"], "Tumakuru", "https://tumkur.nic.in", "Tumkur"],
  ["udupi", "ಉಡುಪಿ", "Udupi", [], "Udupi", "https://udupi.nic.in", "Udupi"],
  ["uttara-kannada", "ಉತ್ತರ ಕನ್ನಡ", "Uttara Kannada", ["North Kanara"], "Karwar", "https://uttarakannada.nic.in", "Uttara Kannada"],
  ["vijayanagara", "ವಿಜಯನಗರ", "Vijayanagara", [], "Hosapete", "https://vijayanagara.nic.in", null],
  ["vijayapura", "ವಿಜಯಪುರ", "Vijayapura", ["Bijapur"], "Vijayapura", "https://vijayapura.nic.in", "Bijapur"],
  ["yadgiri", "ಯಾದಗಿರಿ", "Yadgiri", ["Yadgir"], "Yadgiri", "https://yadgir.nic.in", "Yadgir"],
] as const;

export const districts = z.array(districtSchema).parse(directory.map(([slug, nameKannada, nameEnglish, formerNames, headquarters, officialDirectoryUrl, historicalFeatureName]) => ({
  id: `ka-district-${slug}`, slug, nameKannada, nameEnglish, formerNames: [...formerNames], headquarters, officialDirectoryUrl,
  learning: districtLearningProfiles[slug],
  currentStatusNote: slug === "bengaluru-south" ? "Current official district name; renamed from Ramanagara on 23 May 2025. The headquarters remains Ramanagara." : slug === "vijayanagara" ? "Current district created after the Census 2011 boundary vintage used by this project." : "Listed in the current Government of India district directory.",
  geometry: { availability: historicalFeatureName ? "historical-2011" : "not-in-bundled-map", historicalFeatureName, vintage: "Census 2011" },
})));

export const districtByHistoricalName = new Map(districts.flatMap((district) => district.geometry.historicalFeatureName ? [[district.geometry.historicalFeatureName, district] as const] : []));
export function getDistrictBySlug(slug: string): District | undefined { return districts.find((district) => district.slug === slug); }
export function searchDistricts(query: string): District[] { const needle = query.trim().toLocaleLowerCase("kn"); if (!needle) return districts; return districts.filter((district) => [district.nameKannada, district.nameEnglish, district.headquarters ?? "", ...district.formerNames].some((value) => value.toLocaleLowerCase("kn").includes(needle))); }
