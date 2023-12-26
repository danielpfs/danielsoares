const EMAIL = "contato@danielsoares.dev";
const LINKEDIN = "https://www.linkedin.com/in/danielpfsoares";
const GITHUB = "https://github.com/danielpfs";
const INSTAGRAM = "https://www.instagram.com/danielpfsoares";

export default function Contact() {
  return (
    <div className="flex">
      <div className="flex rounded-lg overflow-hidden bg-zinc-700">
        <img className="w-60" src="me.jpg" alt="profile" />
        <div className="p-4">
          <h1 className="text-lg">Daniel Soares</h1>
          <p className="text-md">Desenvolvedor Full Stack</p>
          <div className="contact">
            <a
              target="_blank"
              href={`mailto:${EMAIL}`}
              className="list-item"
              onClick={(evt) => {
                evt.preventDefault();
                terminal.animateInput("email");
              }}
              rel="noreferrer"
            >
              {/* <Email /> */}
              <span>{EMAIL}</span>
            </a>
            <a
              target="_blank"
              href={LINKEDIN}
              className="list-item"
              onClick={(evt) => {
                evt.preventDefault();
                terminal.animateInput("linkedin");
              }}
              rel="noreferrer"
            >
              {/* <LinkedIn /> */}
              <span>LinkedIn</span>
            </a>
            <a
              target="_blank"
              href={GITHUB}
              className="list-item"
              onClick={(evt) => {
                evt.preventDefault();
                terminal.animateInput("github");
              }}
              rel="noreferrer"
            >
              {/* <GitHub /> */}
              <span>GitHub</span>
            </a>
            <a
              target="_blank"
              href={INSTAGRAM}
              className="list-item"
              onClick={(evt) => {
                evt.preventDefault();
                terminal.animateInput("instagram");
              }}
              rel="noreferrer"
            >
              {/* <Instagram /> */}
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
