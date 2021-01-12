import Head from 'next/head'
import { Email, LinkedIn, Instagram, GitHub } from '@material-ui/icons'

export default function Home () {
  return (
    <div className="container">
      <Head>
        <title>Daniel Soares - Developer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="terminal">danielsoares.dev: <div className="cursor" /></div>
        <div className="card">
          <img className="circle image" src="me.jpg" />
          <h1 className="title">
            Daniel Soares
          </h1>
          <p className="description">
            Desenvolvedor Full Stack
          </p>
          <div className="contact">
            <a target="_blank" href="mailto:contato@danielsoares.dev" className="list-item"><Email /><span>contato@danielsoares.dev</span></a>
            <a target="_blank" href="https://www.linkedin.com/in/danielpfsoares" className="list-item"><LinkedIn /><span>LinkedIn</span></a>
            <a target="_blank" href="https://github.com/danielpfs" className="list-item"><GitHub /><span>GitHub</span></a>
            <a target="_blank" href="https://www.instagram.com/danielpfsoares" className="list-item"><Instagram /><span>Instagram</span></a>
          </div>
        </div>
      </main>

      <style jsx>{`
        h1, p {
          margin: 0;
        }
        a {
          text-decoration: none;
          color: inherit;
          transition: all 500ms;
        }
        a:hover, a:focus {
          color: #45caff;
          transition: all 200ms;
        }
        .card {
          z-index: 1;
          max-width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px;
          border-radius: 1rem;
          background: #666;
        }
        .circle {
          border-radius: 50%;
        }
        .image {
          width: 100%;
          max-width: 180px;
        }
        .contact {
          align-self: start;
        }
        .list-item {
          margin: 8px 0;
          display: flex;
          align-items: center;
        }
        .list-item > span {
          margin: 0 5px;
        }
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .title {
          display: inline-flex;
          align-items: baseline;
          font-size: 3em;
        }

        .description {
          font-size: 1.5rem;
          margin-bottom: 2em;
        }

        .terminal {
          position: absolute;
          top: 4px;
          left: 4px;
          display: flex;
          align-items: baseline;
          font-family: monospace;
        }
        .cursor {
          margin: 0 4px;
          width: 8px;
          height: 16px;
          animation: cursor infinite 1s;
        }
        @keyframes cursor {
          from, to {
            background: #222;
          } 
          50% {
            background: white;
          }
        }
        @media (max-width: 400px) {
          .title {
            font-size: 2.2em;
          }
          .description {
            font-size: 1rem;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          background: #222;
          color: white;
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
