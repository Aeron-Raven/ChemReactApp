import { useEffect } from 'react';
import chemapp1 from '../assets/chemapp1.jpg'
import chemtool from '../assets/ChemToolVision_v1.0.2.apk'
import pic1 from '../assets/pic1.jpg';
import gif1 from '../assets/Mortar and pesl.gif';

const Home = () => {
    useEffect(() => {
        const hiddenElements = document.querySelectorAll(".starthide");

        // Create the IntersectionObserver
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        });

        hiddenElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);
    return (
        <div className="home-page">
            <div className="headimage">
                <img className="fade-animate starthide image" src={chemapp1} alt="" style={{ transition: '2s' }} />
                <div className="starthide headtext fade-animate">
                    <h4>Learn how Chemistry Tools are used</h4>
                    <p>The importance of Chemistry Tools, with the power of Augmented Reality</p>
                </div>
            </div>

            <section className="page-body">
                <div className="box-wrapper">
                    <div className="box-container-1">
                        <h1 className="title is-3">Create New Discoveries</h1>
                        <p>Understand how chemistry tools work with the power of Augmented Reality Technology</p>
                    </div>
                    <div className="starthide startright box-container-2 fade-animate">
                        <img src={gif1} alt="" className="starthide ui rounded image" />
                    </div>
                </div>
                <div id="aboutus"></div>
                <div className="box-wrapper">
                    <div className="starthide startleft box-container-2 fade-animate">
                        <img src={pic1} alt="" className="starthide ui rounded image" />
                    </div>
                    <div className="box-container-1">
                        <h1 className="title is-3">Why are we doing this?</h1>
                        <p>To better help understand how Chemistry tools work, without needing to buy them, making it cost
                            efficient for both students and teachers of Pampanga High School !!</p>
                    </div>
                </div>
                <div id="downloadnow"></div>
                <div className="box-wrapper about-us" style={{ flexDirection: 'column', textAlign: 'center' }}>
                    <h1 className="title is-3">About us</h1>
                    <div className="box behind">
                        <p>We are the IT-69 of the Bachelor of Science in Information Technology of Don Honorio State
                            Ventura University</p>
                        <p>This was made for the purpose of helping the students learn while also making it cost effective</p>
                    </div>
                </div>

                <div className="box-wrapper download" style={{ flexDirection: 'column', textAlign: 'center' }}>
                    <h1 className="title is-1">Download the APK now!
                        <div className="subtitle">Only supports Android Version 9 and above.</div>
                    </h1>
                    <a href={chemtool} download="ChemToolVision.apk" target='_blank' rel='noreferrer'><button className="button is-link">Download</button></a>
                    <table className="table is-fullwidth is-bordered">
                        <thead>
                            <tr>
                                <th>Minimum Requirements &#40;Only Supports Android&#41;</th>
                                <th>Android</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Operating System</td>
                                <td>Android Version 9.0 &#40;Pie&#41;</td>
                            </tr>
                            <tr>
                                <td>Processor</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>RAM &#40;Random Access Memory&#41;</td>
                                <td>2GB RAM</td>
                            </tr>
                            <tr>
                                <td>Disk Space</td>
                                <td>300 MB</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>

    );
}

export default Home;