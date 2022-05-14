import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";
import { AddToQueueOutlined, FacebookOutlined } from "@mui/icons-material";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initalProps = await Document.getInitialProps(ctx);
    return initalProps;
  }

  render() {
    return (
      <Html className="h-100 bg-primary">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body className="d-flex flex-column h-100 ">
          <Main />

          <footer
            className="container bg-blue py-0 my-0 text-center text-light mt-auto d-flex"
            style={{ height: "60px" }}
          >
            <div className="container d-flex justify-content-between my-auto">
              <div className="col-md-4 d-flex align-items-center">
                <AddToQueueOutlined sx={{ fontSize: 25 }} />
                <span className="mb-3 mb-md-0 text-white">
                  © 2022 Company, UMG
                </span>
              </div>
              <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                <li className="ms-3">
                  <FacebookOutlined sx={{ fontSize: 25 }} />
                </li>
                <li className="ms-3">
                  <FacebookOutlined sx={{ fontSize: 25 }} />
                </li>
              </ul>
            </div>
          </footer>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
