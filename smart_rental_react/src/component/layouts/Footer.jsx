import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <Container className="py-4 shadow rounded-1 bg-light-subtle">
      <div className="d-flex justify-content-center">
        <div className="col-md-3 d-flex align-items-center">
          <a href="#" className="text-light text-decoration-none">
            <img
              width="40rem"
              height="40rem"
              src="https://img.icons8.com/color/48/property.png"
              alt="property"
            />
          </a>
          <span className="ms-2">© 2025 SmartStay Pvt. Ltd.</span>
        </div>

        <div className="col-md-3 d-flex justify-content-center">
          <ul className="list-unstyled d-flex">
            <li className="ms-3">
              <a
                className=""
                href="https://github.com/neup-sudip"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  width="40rem"
                  height="40rem"
                  src="https://img.icons8.com/ios-filled/50/github.png"
                  alt="github"
                />
              </a>
            </li>
            <li className="ms-3">
              <a
                className=""
                href="https://gitlab.com/neupanesudip1998"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  width="40rem"
                  height="40rem"
                  src="https://img.icons8.com/color/48/gitlab.png"
                  alt="gitlab"
                />
              </a>
            </li>
            <li className="ms-3">
              <a
                className=""
                href="https://www.linkedin.com/in/sudip-neupane-a6762b215/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  width="40rem"
                  height="40rem"
                  src="https://img.icons8.com/color/48/linkedin.png"
                  alt="linkedin"
                />
              </a>
            </li>
          </ul>
        </div>

        <div className="col-md-3 d-flex justify-content-end">
          <ul className="list-unstyled">
            <li>
              <a
                className="text-light"
                href="mailto:neupanesudip1998@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  width="40rem"
                  height="40rem"
                  src="https://img.icons8.com/color/48/gmail-new.png"
                  alt="gmail-new"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default Footer;
