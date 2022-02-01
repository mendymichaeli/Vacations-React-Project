import React from 'react';

const Footer = ()=> {
    return (
        <footer className="footer">
        <div className="container">
            <div className="row">
                <div className="credits ml-auto">
                    <span className="copyright">
                        &copy; {new Date().getFullYear()}{" "}
                        Made by Mendy Michaeli.
                    </span>
                </div>
            </div>
        </div>
    </footer>
    );
}

export default Footer;
