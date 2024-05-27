import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Drawer, TextField, Button,  InputAdornment, IconButton,CircularProgress } from '@mui/material';
import '../Css/DriverTable.css';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Modal from "@material-ui/core/Modal";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FaTruck, FaCar, FaMotorcycle, FaTruckPickup,FaEdit, FaTrashAlt, FaEye,FaCalendarTimes} from 'react-icons/fa';
import Navbar from '../Components/Navbar';

const DriverTable = () => {
  const [drivers, setDrivers] = useState([]);
  const [activeTab, setActiveTab] = useState('driverList');
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDriverId, setSelectedDriverId] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); 
  const [newDriverDetails, setNewDriverDetails] = useState({
    name: '',
    phone: '',
    email: '',
    tempPassword: '',
    notes: '',
  });
  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState(false);
  const [search, setSearch] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editDriverDetails, setEditDriverDetails] = useState(null);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid lightgray',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  const sstyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600, 
    height: 200, 
    bgcolor: 'background.paper',
    border: '1px solid lightgray',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
     padding: '16px'
  };

  const circularStyle = {
    width: 60, 
    height: 60,
    borderRadius: '50%',
    backgroundColor: '#32c896',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px', 
  };

  const handleViewClick = (driverId) => {
    const driver = drivers.find((d) => d._id === driverId);
    if (driver) {
      setSelectedDriver(driver);
      setSelectedDriverId(driverId);
      setView(true);
    }
  };

  const handleOpen = () => {
    setOpen(true);
};

  const handleClose = () => {
      setOpen(false);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); 
  };


  const handleview = async () => {
    if (selectedDriverId) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/drivers/${selectedDriverId}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch driver details');
        }

        const driver = await response.json();
        setSelectedDriver(driver); 
        console.log(driver);
        setView(true); 
      } catch (error) {
        console.error('Error fetching driver details:', error);
      }
    }
  };

  const handlehide = () => {
    setView(false);
  };

  const fetchDrivers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/drivers');
      if (!response.ok) {
        throw new Error('Failed to fetch driver details');
      }
      const data = await response.json();
      setDrivers(data);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

 


  const handleDrawerClose = () => setIsDrawerOpen(false); 

  const handleEndShift = async () => {
    if (selectedDriverId) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/drivers/${selectedDriverId}`,
          {
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: false }), 
          }
        );
  
        if (!response.ok) {
          throw new Error('Failed to update driver status');
        }
  
        setDrivers((prevDrivers) =>
          prevDrivers.map((driver) =>
            driver._id === selectedDriverId ? { ...driver, status: false } : driver
          )
        );
  
        setAnchorEl(null); // Close the menu
      } catch (error) {
        console.error('Error ending shift:', error);
      }
    }
  };

  const handleThreeDotsClick = (event, driverId) => {
    setAnchorEl(event.currentTarget);
    setSelectedDriverId(driverId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteDriver = async () => {
    if (!selectedDriverId) return;
    console.log(selectedDriverId);
    
    try {
      const response = await fetch(`http://localhost:3000/api/drivers/${selectedDriverId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete driver');
      }

      setDrivers((prevDrivers) => prevDrivers.filter((driver) => driver._id !== selectedDriverId));
      setIsDeleteDialogOpen(false);
      setAnchorEl(null);
    } catch (error) {
      console.error('Error deleting driver:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setNewDriverDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleSaveDriver = async () => {
    const requiredFields = ['name', 'phone', 'email' , 'tempPassword' ];
    const missingFields = requiredFields.filter((field) => !newDriverDetails[field]);
  
    if (missingFields.length > 0) {
      alert(`Please fill out the following fields: ${missingFields.join(', ')}`);
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/api/drivers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDriverDetails),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create a new driver: ${errorText}`);
      }
  
      const createdDriver = await response.json();
      setDrivers((prevDrivers) => [...prevDrivers, createdDriver]);
  
      setNewDriverDetails({
        name: '',
        phone: '',
        email: '',
        tempPassword: '',
        notes: '',
      });
  
      handleClose();
      handleDrawerClose();
    } catch (error) {
      console.error('Error creating driver:', error);
      alert(`Error creating driver: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

 const handleEdit = (driverId) => {
  const driver = drivers.find((d) => d._id === driverId);
  if (driver) {
    setEditDriverDetails(driver); 
    setIsEditModalOpen(true); 
  } else {
    console.error("Driver not found");
  }
};
  const handleEditInputChange = (field, value) => {
    setEditDriverDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleSaveEdit = async () => {
    if (!editDriverDetails) return;
  
    try {
      const response = await fetch(`http://localhost:3000/api/drivers/${editDriverDetails._id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editDriverDetails), 
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update driver: ${errorText}`);
      }
  
      const updatedDriver = await response.json();
      setDrivers((prevDrivers) => 
        prevDrivers.map((driver) =>
          driver._id === updatedDriver._id ? updatedDriver : driver
        )
      );
  
      setIsEditModalOpen(false); 
    } catch (error) {
      console.error('Error updating driver:', error);
    }
  };

  const getVehicleIcon = (vehicle) => {
    switch (vehicle) {
      case 'Truck':
        return <FaTruck />;
      case 'Car':
        return <FaCar />;
      case 'Pickup Truck':
        return <FaTruckPickup />;
      case 'Motorcycle':
        return <FaMotorcycle />;
      default:
        return <FaCar />; 
    }
  };

  return (
    <div>
  <Navbar />
  <div className="page">
    <div className="driver-table">
      <div className="header">
        <h2>Drivers</h2>
        <div className="actions">
          <div className="search-wrapper">
            <FaSearch id="search-icon" className="search-icon" />
            <Form>
              <InputGroup className='search-wrapper-input border-0 shadow-none'>
                <Form.Control
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder='Search'
                />
              </InputGroup>
            </Form>
          </div>
          <button className="get-app-button">Get the app</button>
          <button className="new-driver-button" onClick={handleOpen}>+ New Driver</button>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div>
              <p style={{ fontFamily: "sans-serif", fontSize: 24, fontWeight: 300 }}>Add a new driver</p>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField style={{ margin: 5, }}
                  label="Name"
                  value={newDriverDetails.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
                <TextField style={{ margin: 5 }}
                  label="+91 Phone No"
                  value={newDriverDetails.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
              <TextField
                label="Email"
                value={newDriverDetails.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                style={{ marginTop: 10, width: '100%' }}
              />
            <TextField
                label="Temporary Password"
                type={showPassword ? 'text' : 'password'} 
                value={newDriverDetails.tempPassword}
                onChange={(e) => handleInputChange('tempPassword', e.target.value)} 
                style={{ marginTop: 10, width: '100%' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Note"
                multiline
                rows={4}
                value={newDriverDetails.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                style={{ marginTop: 10, width: '100%' }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
                <Button onClick={handleClose} style={{ border: '1px solid rgba(0, 0, 0, 0.05)', borderRadius: 6, padding: 6, paddingLeft: 20, paddingRight: 20, color: "black", marginRight: 5 }}>Cancel</Button>
                <Button onClick={handleSaveDriver} style={{ border: '1px solid rgba(0, 0, 0, 0.05)', borderRadius: 6, padding: 6, paddingLeft: 20, paddingRight: 20, color: "white", backgroundColor: "#32C896" }}>Save</Button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>

      <Modal
      open={view}
      onClose={handlehide}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={view}>
        <Box sx={sstyle}>
          {selectedDriver ? (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ textAlign: 'center', marginRight: '40px' }}>
                <div style={circularStyle}>
                  {selectedDriver.name.charAt(0).toUpperCase()} 
                </div>
                <p>{selectedDriver.name}</p> 
              </div>

            
              <div style={{ flexGrow: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}> {/* Gap creates space */}
               
                <div>
                  <p><strong>Phone:</strong> {selectedDriver.phone}</p>
                  <p><strong>Email:</strong> {selectedDriver.email}</p>
                  <p><strong>Vehicle:</strong> {selectedDriver.vehicle || "No vehicle"}</p>
                </div>

                
                <div>
                  <p><strong>Area:</strong> {selectedDriver.area || "N/A"}</p>
                  <p><strong>Note:</strong> {selectedDriver.notes || "No notes"}</p>
                </div>
              </div>
            </div>
          ) : (
            <CircularProgress /> 
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              onClick={handlehide}
              style={{
                backgroundColor: 'white',
                color: 'black',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '6px 12px',
              }}
            >
              Close
            </Button>
          </div>
        </Box>
      </Fade>
    </Modal>
      {/* // Edit Modal */}
      <Dialog
  open={isEditModalOpen}
  onClose={() => setIsEditModalOpen(false)}
  maxWidth="sm"
  fullWidth
  PaperProps={{
    style: {
      height: '80vh',
      width: '500px',
      overflowY: 'auto', 
    },
  }}
>
    <DialogTitle>Edit Driver</DialogTitle>
    <DialogContent>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <TextField
          label="Name"
          value={editDriverDetails?.name || ''}
          onChange={(e) => handleEditInputChange('name', e.target.value)}
          fullWidth
          style={{ flex: 1, marginRight: '10px', marginTop: '10px'}}
        />
        <TextField
          label="+91 Phone No"
          value={editDriverDetails?.phone || ''}
          onChange={(e) => handleEditInputChange('phone', e.target.value)}
          fullWidth
          style={{ flex: 1 ,marginTop: '10px'}}
        />
      </div>

      <TextField
        label="Email"
        value={editDriverDetails?.email || ''}
        onChange={(e) => handleEditInputChange('email', e.target.value)}
        fullWidth
        style={{ marginTop: '20px' }} 
      />
      <TextField
      label="Notes"
      value={editDriverDetails?.notes || ''}
      onChange={(e) => handleEditInputChange('notes', e.target.value)}
      fullWidth
      multiline
      rows={6} 
      style={{ marginTop: '20px' }} 
      />

      {/* <TextField
        label="Temporary Password"
        type={showPassword ? 'text' : 'password'}
        value={editDriverDetails?.tempPassword || ''}
        onChange={(e) => handleEditInputChange('tempPassword', e.target.value)}
        fullWidth
        style={{ marginTop: '10px' }} 
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleTogglePasswordVisibility}
                aria-label="toggle password visibility"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      /> */}
    </DialogContent>
    <DialogActions>
    <Button
  onClick={() => setIsEditModalOpen(false)}
  style={{
    backgroundColor: 'white', 
    color: 'black', 
    border: '1px solid #ccc', 
    borderRadius: '4px', 
    padding: '6px 12px', 
  }}
>
  Cancel
</Button>
      <Button onClick={handleSaveEdit}
        style={{
          backgroundColor: '#32c896', 
          color: 'black', 
          border: '1px solid #ccc', 
          borderRadius: '4px', 
          padding: '6px 12px', 
        }}>
        Save
      </Button>
    </DialogActions>
  </Dialog>

      <div className="tabs">
        <button
          className={activeTab === 'driverList' ? 'active' : ''}
          onClick={() => setActiveTab('driverList')}
        >
          Driver List
        </button>
        <button
          className={activeTab === 'dailyPayment' ? 'active' : ''}
          onClick={() => setActiveTab('dailyPayment')}
        >
          Daily Payment
        </button>
      </div>

      {activeTab === 'driverList' && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Vehicle</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {drivers.filter((driver) => {
              return search.toLowerCase() === ''
                ? driver
                : driver.name.toLowerCase().includes(search);
            }).map((driver) => (
              <tr key={driver._id} className={driver.status ? 'driver-active' : 'driver-inactive'}>
                  <td
                onClick={() => handleViewClick(driver._id)} 
                className="clickable-name" 
              >
                 <span className="circular-initial">
                 {driver.name.charAt(0).toUpperCase()}
                 </span>
                  {driver.name}
              </td>
                <td>{driver.phone}</td>
                <td>{driver.email}</td>
                <td>{getVehicleIcon(driver.vehicle)}</td>
                {/* <td>{driver.vehicle ? <span>{driver.vehicle}</span> :<svg version="1.1" id="car-15" xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 15 15"><path d="M14,7c-0.004-0.6904-0.4787-1.2889-1.15-1.45l-1.39-3.24l0,0l0,0l0,0C11.3833,2.1233,11.2019,2.001,11,2H4C3.8124,2.0034,3.6425,2.1115,3.56,2.28l0,0l0,0l0,0L2.15,5.54C1.475,5.702,0.9994,6.3059,1,7v3.5h1v1c0,0.5523,0.4477,1,1,1s1-0.4477,1-1v-1h7v1c0,0.5523,0.4477,1,1,1s1-0.4477,1-1v-1h1V7z M4.3,3h6.4l1.05,2.5h-8.5L4.3,3z M3,9C2.4477,9,2,8.5523,2,8s0.4477-1,1-1s1,0.4477,1,1S3.5523,9,3,9z M12,9c-0.5523,0-1-0.4477-1-1s0.4477-1,1-1s1,0.4477,1,1S12.5523,9,12,9z"></path></svg>}</td> */}
                <td>{driver.status ? 'On Duty' : 'Off Duty'}</td>
                <td>
                  <button
                    className="three-dots"
                    onClick={(e) => handleThreeDotsClick(e, driver._id)}
                    style={{padding: 6,paddingLeft: 12, paddingRight: 12, cursor: "pointer", textAlign: "center", display: "inline-block", backgroundColor: "transparent", borderRadius: 4, border: "1px solid #EFEFEF"}}
                  >
                    <span>
                      ...
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleview}> <FaEye style={{ marginRight: '8px' }}/>  View Details</MenuItem>
        {selectedDriverId && drivers.find((d) => d._id === selectedDriverId)?.status && (
        <MenuItem onClick={handleEndShift}><FaCalendarTimes style={{ marginRight: '8px' }}/>End Shift</MenuItem> // Only show if the driver's status is true
  )}
        <MenuItem onClick={() => handleEdit(selectedDriverId)}><FaEdit style={{ marginRight: '8px' }}/>  Edit</MenuItem>
        {/* <MenuItem onClick={() => console.log('Reset driver password', selectedDriverId)}>Reset Password</MenuItem> */}
        <MenuItem onClick={handleOpenDeleteDialog}> <FaTrashAlt style={{ marginRight: '8px' }}/>  Delete</MenuItem>
      </Menu>

      

      <Dialog
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Delete Driver</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this driver?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} 
           style={{
            backgroundColor: '#32c896', 
            color: 'black', 
            border: '1px solid #ccc', 
            borderRadius: '4px', 
            padding: '6px 12px', 
          }}>
            Cancel
          </Button>
          <Button onClick={handleDeleteDriver}  style={{
            backgroundColor: 'white', 
            color: 'black', 
            border: '1px solid #ccc', 
            borderRadius: '4px', 
            padding: '6px 12px', 
  }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
        
      </Drawer>
    </div>
    </div>
    </div>
  );
};

export default DriverTable;
