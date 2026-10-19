import { PageHero } from "@/components/page-hero";

export const metadata = {
  title: "About",
  description:
    "Why Kannadada Beru documents regional Kannada words, expressions, pronunciation, and cultural memory.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ನಮ್ಮ ಉದ್ದೇಶ · Our purpose"
        title="ನಮ್ಮ ನುಡಿ, ನಮ್ಮ ಬೇರು, ನಮ್ಮ ಹೆಮ್ಮೆ"
        lead="A heartfelt promise to listen to, document, and carry the many living voices of Kannada forward."
      />

      <section className="shell about-message" aria-labelledby="about-kannada-title">
        <article className="about-letter about-letter-kannada" lang="kn">
          <p className="eyebrow">ಕನ್ನಡದಲ್ಲಿ</p>
          <h2 id="about-kannada-title">ಕನ್ನಡದ ಪ್ರತಿಯೊಂದು ಧ್ವನಿಯೂ ಒಂದು ನೆನಪು</h2>
          <p>
            ಕನ್ನಡವು ಕೇವಲ ಒಂದು ಭಾಷೆಯಲ್ಲ—ಅದು ನಮ್ಮ ಮನೆಯ ಧ್ವನಿ, ನಮ್ಮ ಸಂಬಂಧಗಳ
            ಆತ್ಮೀಯತೆ ಮತ್ತು ನಮ್ಮ ಪೂರ್ವಜರು ಬಿಟ್ಟುಹೋದ ನೆನಪು. ಪ್ರತಿಯೊಂದು ಪ್ರಾದೇಶಿಕ
            ಪದ, ನುಡಿಗಟ್ಟು, ಮಾತಿನ ಶೈಲಿ ಮತ್ತು ಉಚ್ಚಾರಣೆಯಲ್ಲೂ ಒಂದು ಊರಿನ ಕಥೆ, ಒಂದು
            ಸಮುದಾಯದ ಬದುಕು ಮತ್ತು ನಮ್ಮ ಸಂಸ್ಕೃತಿಯ ಗುರುತು ಅಡಗಿದೆ.
          </p>
          <p>
            ಕಾಲದೊಂದಿಗೆ ಈ ಅಮೂಲ್ಯ ಧ್ವನಿಗಳು ಮೌನವಾಗಿ ಮರೆಯಾಗಬಾರದು ಎಂಬ ಸರಳ ಆಶಯದಿಂದ
            <strong> ಕನ್ನಡದ ಬೇರು </strong>ಹುಟ್ಟಿಕೊಂಡಿದೆ. ಪರಸ್ಪರರ ಮಾತುಗಳನ್ನು
            ಆಲಿಸುವ ಮೂಲಕ, ದಾಖಲಿಸುವ ಮೂಲಕ, ಹಂಚಿಕೊಳ್ಳುವ ಮೂಲಕ ಮತ್ತು ಕಲಿಯುವ ಮೂಲಕ—ಕನ್ನಡದ
            ವೈವಿಧ್ಯತೆಯನ್ನು ಕಳೆದುಕೊಳ್ಳದೆ ಅದನ್ನು ಇನ್ನಷ್ಟು ಬೆಳೆಸಬಹುದು.
          </p>
          <p>
            ಇದು ಕೇವಲ ಒಂದು ಡಿಜಿಟಲ್ ಯೋಜನೆಯಲ್ಲ. ನಮಗೆ ಮೊದಲ ಮಾತು ಕಲಿಸಿದ, ನಮ್ಮ
            ಗುರುತನ್ನು ರೂಪಿಸಿದ ಮತ್ತು ನಮ್ಮತನದ ಭಾವನೆ ನೀಡಿದ ತಾಯ್ನುಡಿಗೆ ಸಲ್ಲಿಸುವ ಒಂದು
            ಪುಟ್ಟ ಕೃತಜ್ಞತೆಯ ಕಾಣಿಕೆ.
          </p>
          <p>
            ಕನ್ನಡವನ್ನು ಹೆಮ್ಮೆಯಿಂದ ಮಾತನಾಡೋಣ, ಪ್ರೀತಿಯಿಂದ ಕಾಪಾಡೋಣ ಮತ್ತು ಮುಂದಿನ
            ಪೀಳಿಗೆಗೆ ಜವಾಬ್ದಾರಿಯಿಂದ ತಲುಪಿಸೋಣ.
          </p>
          <blockquote>
            ಕನ್ನಡವನ್ನು ಬೆಳೆಸೋಣ. ಕನ್ನಡವನ್ನು ಉಳಿಸೋಣ.
            <br />
            ನಮ್ಮ ನುಡಿ, ನಮ್ಮ ಬೇರು, ನಮ್ಮ ಹೆಮ್ಮೆ.
          </blockquote>
        </article>

        <article className="about-letter" lang="en">
          <p className="eyebrow">In English</p>
          <h2>Every Kannada voice carries a memory</h2>
          <p>
            Kannada is more than a language—it is the voice of our homes, the
            warmth of our relationships, and the memory of generations before us.
            Every regional word, familiar expression, and unique pronunciation
            carries a story of a place and its people.
          </p>
          <p>
            Kannadada Beru was created with a simple hope: that these voices will
            not quietly disappear with time. By listening, documenting, sharing,
            and learning from one another, we can help Kannada grow without losing
            the beautiful diversity held within it.
          </p>
          <p>
            This is not merely a digital project. It is a small offering of
            gratitude to the language that gave us our first words, our identity,
            and a place to belong.
          </p>
          <p>
            Let us speak Kannada with pride, preserve it with care, and pass it
            forward with love.
          </p>
          <blockquote>
            Let Kannada grow. Let Kannada endure.
            <br />
            Our language, our roots, our pride.
          </blockquote>
        </article>
      </section>

      <section className="shell prose-grid about-commitments">
        <article>
          <p className="eyebrow">Our living language platform</p>
          <h2>A respectful home for living Kannada</h2>
          <p>
            An interactive platform where people can explore
            regional words, expressions, pronunciation, and cultural context.
            Every entry keeps its connection to the people, place and cultural
            setting that give it meaning.
          </p>
        </article>
        <aside>
          <h3>Our commitments</h3>
          <ol>
            <li>Never invent regional claims.</li>
            <li>Show where every record came from.</li>
            <li>Respect voice contributors and informed consent.</li>
            <li>Be open about variation across places and communities.</li>
            <li>Invite communities to correct and strengthen the collection.</li>
          </ol>
        </aside>
      </section>
    </>
  );
}
