
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <div className="social">
                        <h2 className="text-lg font-semibold">Contact Us:</h2>
                        <div className="flex space-x-4 mt-2">
                            <a title="Send an email to us" href="mailto:mollyrosefoundation@gmail.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                <i className="fa fa-envelope-o fa-2x"></i>
                            </a>
                            <a title="Go to our twitter page" href="https://twitter.com/mollyrosecancer" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                <i className="fa fa-twitter fa-2x"></i>
                            </a>
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm">
                        Designed and Developed by Alan Mc Gee <br /> &copy;&nbsp;2020
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
