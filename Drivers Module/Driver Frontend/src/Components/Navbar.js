import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import '../Css/Navbar.css';
import { FaRegBellSlash, FaRegBell, FaRegUserCircle, FaTwitter } from "react-icons/fa";
import { IoMdHelpCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { IoVideocamOutline, IoCallOutline, IoSettingsOutline, IoMailOutline } from "react-icons/io5";
import { MdOutlineChat, MdOutlineInstallMobile } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";
import { FiLogOut, FiGift } from "react-icons/fi";
import { GoMoon } from "react-icons/go";
import { FaFacebook } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
// Material UI
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
// FAQ
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
// feedback
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// sound file
// import bellSound from '../assets/bell.wav';
// import bellSound from '../assets/bell2.mp3';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Navbar = () => {
    const [bell, setBell] = useState(true);
    const [helpDropdown, setHelpDropdown] = useState(false);
    const [userDropdown, setUserDropdown] = useState(false);
    const [openCall, setOpenCall] = React.useState(false);
    const [openFAQ, setOpenFAQ] = React.useState(false);
    const [openReferrals, setOpenReferrals] = React.useState(false);
    const [openFeedback, setOpenFeedback] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const dropdownRef = useRef(null);

    // for details
    const userEmail = sessionStorage.getItem('userEmail');
    const [userName, setUserName] = useState('');
    const [userBusinessName, setUserBusinessName] = useState('');
    // const [userBusinessType, setUserBusinessType] = useState('');
    // const [userMerPhone, setUserMerPhone] = useState('');
    // const [userMerStoreAdd, setUserMerStoreAdd] = useState('');
    // const [userMaxDelTime, setUserMaxDelTime] = useState('');
    // const [userOrderPrepTime, setUserOrderPrepTime] = useState('');

    // const audioRef = useRef(new Audio(bellSound)); // Create audio reference

    const toggleHelpDropdown = () => {
        setHelpDropdown(!helpDropdown);
    };

    const toggleUserDropdown = () => {
        setUserDropdown(!userDropdown);
    };

    const toggleIcon = () => {
        setBell(!bell);
        // audioRef.current.play(); // Play sound when bell is clicked
    };

    const handleClickOpenCall = () => {
        setOpenCall(true);
    };

    const handleCloseCall = () => {
        setOpenCall(false);
    };

    const handleClickOpenFeedback = () => {
        setOpenFeedback(true);
    };

    const handleCloseFeedback = () => {
        setOpenFeedback(false);
    };

    const cannotOpen = () => {
        alert("This section is under progress");
    }

    const handleClickOpenFAQ = () => {
        setOpenFAQ(true);
    };

    const handleCloseFAQ = () => {
        setOpenFAQ(false);
    };

    const handleToggleFAQ = () => {
        if (!openFAQ) {
            handleClickOpenFAQ();
        }
    };

    const handleClickOpenReferrals = () => {
        setOpenReferrals(true);
    };

    const handleCloseReferrals = () => {
        setOpenReferrals(false);
    };

    const handleToggleReferrals = () => {
        if (!openReferrals) {
            handleClickOpenReferrals();
        }
    };

    const handleToggleCall = () => {
        if (!openCall) {
            handleClickOpenCall();
        }
    }

    const handleToggleFeedback = () => {
        if (!openFeedback) {
            handleClickOpenFeedback();
        }
    }

    const getInitials = (name) => {
        return name.split(' ').map(word => word.charAt(0)).join('');
    };

    const handleSendFeedback = () => {
        // extracting the content of the text area of feedback form
        const feedbackContent = document.querySelector('#feedbackTextArea').value;
        // mailto link with feedback content as body
        const mailtoLink = `mailto:hr@bntechnology.net?subject=Feedback&body=${encodeURIComponent(feedbackContent)}`;
        // opens default email client with mailto link
        window.location.href = mailtoLink;
        handleCloseFeedback();
        alert("Thank you for the feedback!");
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/login/getUserByEmail?email=${userEmail}`);
                if (response.ok) {
                    const userData = await response.json();
                    setUserName(userData.name);
                    setUserBusinessName(userData.businessName);
                    // setUserBusinessType(userData.businessType);
                    // setUserMerPhone(userData.merPhone);
                    // setUserMerStoreAdd(userData.merStoreAdd);
                    // setUserMaxDelTime(userData.maxDelTime);
                    // setUserOrderPrepTime(userData.orderPrepTime);
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (userEmail) {
            fetchUserData();
        }
    }, [userEmail]);

    return (
        <div className="navbar-container">
            <nav>
                <div className="title"><b>Vitran</b></div>
                <ul>
                    <li className="l"><Link to="/">Dispatch</Link></li>
                    <li className="l"><Link to="/Orders">Orders</Link></li>
                    <li className="l"><Link to="/Drivers">Drivers</Link></li>
                    <li className="l"><Link to="/Map">Map</Link></li>
                    <li className="l"><Link to="/Reports">Reports</Link></li>
                    <li className="icon">{bell ? <FaRegBellSlash onClick={toggleIcon} /> : <FaRegBell onClick={toggleIcon} />}</li>
                    <li className="icon">
                        <IoMdHelpCircleOutline onClick={toggleHelpDropdown} className={`helpDropdown-btn ${helpDropdown ? 'open' : ''}`} />
                        {helpDropdown && (
                            <div ref={dropdownRef} className={`helpDropdown-content ${helpDropdown ? 'show' : ''}`}>
                                <li onClick={handleToggleFAQ}><Link to="#"><IoMdHelpCircleOutline /> Frequently Asked Questions </Link>
                                    <Dialog fullScreen open={openFAQ} onClose={handleCloseFAQ} TransitionComponent={Transition}>
                                        <AppBar sx={{ position: 'relative', backgroundColor: '#23c58f' }}>
                                            <Toolbar>
                                                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                                    FAQ
                                                </Typography>
                                                <IconButton edge="start" color="inherit" onClick={handleCloseFAQ} aria-label="close">
                                                    <CloseIcon />
                                                </IconButton>
                                            </Toolbar>
                                        </AppBar>
                                        <List>
                                            <ListItemText className="dialogFAQ" primary="How do I set up drivers?" secondary="You can add drivers from the “Driver” tab. Drivers need to download the driver app named “Vitran Drive” from the App Store." />
                                            <Divider />
                                            <ListItemText className="dialogFAQ" primary="How do I add orders?" secondary="You can add orders to the system via manual order entry form under the “Orders” tab. Please see below: Once you click the “+New Order” button, you’ll see this form appear for manual order entry" />
                                            <Divider />
                                            <ListItemText className="dialogFAQ" primary="How do I get orders directly from customers?" secondary="You can do it easily with web forms.  We have created different web forms that you can add to your website to get orders directly from your customers. Once an order is entered through this system, an email is sent to the dispatcher as well." />
                                            <Divider />
                                            <ListItemText className="dialogFAQ" primary="What do these different order tabs mean?" secondary={
                                                <>
                                                    Once you enter an order, you can see the order under the “Current Orders” tab or “Scheduled Orders” tab.
                                                    <br />
                                                    Current Orders: These are the orders that are active now and have an expected delivery time within the next few hours.
                                                    <br />
                                                    Scheduled Orders: This is the parking lot of future orders. If an order is scheduled to be delivered in the future, it is saved under this tab.
                                                    <br />
                                                    The time window for moving the order from scheduled orders to current order tab can be controlled through a setting called “Dispatch Time Window”.
                                                </>
                                            } />
                                            <Divider />
                                            <ListItemText className="dialogFAQ" primary="How do I edit driver info and delete drivers?" secondary={
                                                <>
                                                    Edit driver info from the Driver tab using the “Edit” button. You can change name, phone number, and other information. You can also delete a driver.
                                                    <br />
                                                    The unique ID for drivers are their email address. So you can’t have two driver accounts with the same email address.
                                                    <br />
                                                    If any driver is highlighted in red on the dispatch dashboard, it means the location of the driver has not been updated over 2 mins.
                                                </>
                                            } />
                                            <Divider />
                                            <ListItemText className="dialogFAQ" primary="How do I dispatch a driver?" secondary={
                                                <>
                                                    You can dispatch a driver from 3 different places:
                                                    ‍<br /><br />
                                                    Dispatch tab - Use the “Assign” button on the order box.
                                                    <br />
                                                    Current Order tab - Use the “Assign” button for each of the orders on the order table.
                                                    <br />
                                                    Map - Click on the delivery dot to see delivery details and assign drivers from there.
                                                </>
                                            } />
                                            <Divider />
                                            <ListItemText className="dialogFAQ" primary="What do different map icons mean?" secondary={
                                                <>
                                                    There are three basic shapes of icons:
                                                    <br /><br />
                                                    Pins - Pins shows pick-up location. The number inside the pin shows how many orders that pickup location has.
                                                    <br />
                                                    Round dots  - These show the delivery location. The number inside indicates how many minutes the order has been waiting since it was entered in the system.
                                                    <br />
                                                    Small rectangles - These represent the location of drivers. If they are green, the driver is waiting for orders. If black, the driver is working on an order.
                                                </>
                                            } />
                                            <Divider />
                                            <ListItemText className="dialogFAQ" primary="How to do get orders from customers?" secondary="You can get orders from customers via direct integration with any online ordering platform, or integrate our APIs to your website, or you can add templated online forms to your website. We have few forms to choose form. You can copy the link of the online form and share with your customers too. " />
                                            <Divider />
                                            <ListItemText className="dialogFAQ" primary="Can I connect multiple restaurants or retailers to one one account?" secondary={
                                                <>
                                                    Yes, you can!
                                                    <br /><br />
                                                    You can use your the account API key ( look under the integration page) to add to multiple ordering site accounts to bring all their orders to your one account for delivery management. Same with the email integration.
                                                    <br />
                                                    You can share the email tied to your account with various online ordering systems to receive their orders automatically on your Dashboard.
                                                </>
                                            } />
                                        </List>
                                    </Dialog>
                                </li>
                                <li onClick={cannotOpen}><Link to="#"><IoVideocamOutline /> Video Tutorials</Link></li>
                                <hr />
                                <li onClick={handleToggleCall}><Link to="#"><IoCallOutline /> Call Us </Link>
                                    <div className="callUsPopup">
                                        <Dialog fullScreen={fullScreen} open={openCall} aria-labelledby="responsive-dialog-title">
                                            <DialogTitle id="responsive-dialog-title">
                                                <div className="callText">
                                                    <b>
                                                        {"Question?"}
                                                    </b>
                                                </div>
                                            </DialogTitle>
                                            <DialogContent>
                                                <button className="close-btn" onClick={handleCloseCall}><IoMdCloseCircleOutline /></button>
                                                <DialogContentText>
                                                    <div className="callText">Call us:</div>
                                                    <div className="callText">+91-9876543210</div>
                                                </DialogContentText>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </li>
                                <li onClick={cannotOpen}><Link to="#"><MdOutlineChat /> Chat With Us</Link></li>
                                <hr />
                                <li onClick={handleToggleFeedback}><Link to="#"><TfiAnnouncement /> Send Feedback</Link>
                                    <div className="callUsPopup">
                                        <Dialog fullScreen={fullScreen} open={openFeedback} aria-labelledby="responsive-dialog-title">
                                            <DialogTitle id="responsive-dialog-title">
                                                <div>
                                                    <b>
                                                        {"Send your feedback"}
                                                    </b>
                                                </div>
                                            </DialogTitle>
                                            <DialogContent>
                                                <button className="close-btn" onClick={handleCloseFeedback}><IoMdCloseCircleOutline /></button>
                                                <DialogContentText>
                                                    <Box component="form" sx={{
                                                        '& .MuiTextField-root': { m: 1, width: '550px', paddingRight: '10px' },
                                                    }} noValidate autoComplete="off">
                                                        <div>
                                                            <TextField
                                                                sx={{
                                                                    '& .MuiInputBase-root': {
                                                                        height: '155px', // sets the height for the root element
                                                                        overflow: 'auto', // ensures scrolling within the fixed height
                                                                    },
                                                                    '& .MuiInputBase-input': {
                                                                        height: '155px', // sets the height for the input element
                                                                        boxSizing: 'border-box', // ensures padding and border are included in the height
                                                                        overflow: 'auto', // ensures scrolling within the fixed height
                                                                    },
                                                                    '& .MuiOutlinedInput-root': {
                                                                        '& fieldset': {
                                                                            borderColor: 'gray', // initial border color
                                                                        },
                                                                        '&:hover fieldset': {
                                                                            borderColor: 'gray', // border color on hover
                                                                        },
                                                                        '&.Mui-focused fieldset': {
                                                                            borderColor: '#23c58f', // border color when focused
                                                                        },
                                                                    },
                                                                }}
                                                                id="feedbackTextArea"
                                                                multiline
                                                                placeholder={"Hi, \n\nPlease let us know your needs. You can write here about the problem, improvement, suggestion, requirements, etc. \n\nThanks"}
                                                                InputProps={{
                                                                    style: {
                                                                        minHeight: '185px', // makes sure the height is 100% of the parent
                                                                        height: 'auto',
                                                                        width: '100%',
                                                                        overflow: 'auto',
                                                                    }
                                                                }}
                                                            />
                                                        </div>
                                                    </Box>
                                                </DialogContentText>

                                            </DialogContent>
                                            <div className="feedbackButtons">
                                                <Button sx={{ color: 'black', border: '1px solid #ccc', paddingLeft: '30px', paddingRight: '30px', marginRight: '10px' }} onClick={handleCloseFeedback}>
                                                    Cancel
                                                </Button>
                                                <Button sx={{ backgroundColor: '#23c58f', color: 'white', paddingLeft: '30px', paddingRight: '30px', '&:hover': { backgroundColor: '#1a8f68', }, }} onClick={handleSendFeedback}>
                                                    Send
                                                </Button>
                                            </div>
                                        </Dialog>
                                    </div>
                                </li>
                            </div>
                        )}
                    </li>
                    <li className="iconFace">
                        <FaRegUserCircle onClick={toggleUserDropdown} className={`userDropdown-btn ${userDropdown ? 'open' : ''}`} />
                        {userDropdown && (
                            <div ref={dropdownRef} className={`userDropdown-content ${userDropdown ? 'show' : ''}`}>
                                <div className="loggedInUser">
                                    <div>
                                        <li className="initChar">{getInitials(userName)}</li>
                                    </div>
                                    <div>
                                        <p>{userName && <p><b>{userName}</b></p>}</p>
                                        <p>{userBusinessName && <p>{userBusinessName}</p>}</p>
                                    </div>
                                </div>
                                <hr />
                                <li><Link to="/settings"><IoSettingsOutline /> Settings </Link></li>
                                <li onClick={cannotOpen}><Link to="#"><FiLogOut /> Log Out </Link></li>
                                <hr />
                                <li onClick={cannotOpen}><Link to="#"><GoMoon /> Theme </Link></li>
                                <li onClick={handleToggleReferrals}><Link to="#"><FiGift /> Referrals </Link>
                                    <Dialog className="referralsbox" fullScreen open={openReferrals} onClose={handleCloseReferrals} TransitionComponent={Transition}>
                                        <AppBar sx={{ position: 'relative', backgroundColor: '#23c58f' }}>
                                            <Toolbar>
                                                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                                    $100 for you, $50 for them
                                                </Typography>
                                                <IconButton edge="start" color="inherit" onClick={handleCloseReferrals} aria-label="close">
                                                    <CloseIcon />
                                                </IconButton>
                                            </Toolbar>
                                        </AppBar>
                                        <div>
                                            <p>
                                                Get $100 in Vitran Credit when your referral signs up for any of our paid plans
                                            </p>
                                            <div className="socialMedia">
                                                <p><b>Share on Social Media</b></p>
                                                <div>
                                                    <FaFacebook className="socialMediaIcons" />
                                                    <FaTwitter className="socialMediaIcons" />
                                                    <BsTwitterX className="socialMediaIcons" />
                                                    <IoMailOutline className="socialMediaIcons" />
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog>
                                </li>
                                <li onClick={cannotOpen}><Link to="#"><MdOutlineInstallMobile /> Download the app </Link></li>
                            </div>
                        )}
                    </li>
                </ul>
            </nav>
            {/* <div className="userInfo">
                {userEmail && (
                    <div>
                        <p>Welcome, {userName}</p>
                        <p>Business: {userBusinessName}</p>
                        <p>Type: {userBusinessType}</p>
                        <p>Phone: {userMerPhone}</p>
                        <p>Address: {userMerStoreAdd}</p>
                        <p>Max Delivery Time: {userMaxDelTime}</p>
                        <p>Order Preparation Time: {userOrderPrepTime}</p>
                    </div>
                )}
            </div> */}
        </div >
    );
}

export default Navbar;