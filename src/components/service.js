import React, { useState, useEffect } from "react";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody,MDBInput,MDBFile} from 'mdb-react-ui-kit';
import { Modal, Button } from "react-bootstrap";
export default function Service() {
  const [services, setServices] = useState({ servicesPosts: [] });
  const [selectedService, setSelectedService] = useState(null);
  const [modifyServiceData, setModifyServiceData] = useState(null);
  const [newServiceData, setNewServiceData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [show, setShow] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const handleClose = () => {setShow(false),setShowAddModal(false)};
  const handleShow = () => setShow(true);
  useEffect(() => {
    // Fetch data from your API
    fetch("http://localhost:9000/.netlify/functions/api/getTech")
      .then((response) => response.json())
      .then((data) => {
        setServices(data); // Update the state variable to setServices
        console.log(data);
      })
      .catch((error) => console.error("Error fetching Services:", error));
  }, [updateTrigger]);
  const handleModifyClick = (service) => {
    // Set the selected blog for modification
    setSelectedService(service);

    // Set data for modification
    setModifyServiceData({
      technoId: service.id,
      title: service.title,
      description: service.description,
      image:service.image
      // Add other properties as needed
    });
    console.log(modifyServiceData)

    // Show the modal
    handleShow();
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModifyServiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result.split(',')[1]; // Extract base64 data
        setModifyServiceData((prevData) => ({
          ...prevData,
          image: base64Data,
          file, // Keep the file if needed for further processing
        }));
        console.log("this",base64Data)
      };
  
      reader.readAsDataURL(file);
    }

  };
  const handleSaveChanges = () => {
    console.log(modifyServiceData)
    // Make API call to modifyService
    fetch("http://localhost:9000/.netlify/functions/api/modTech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...modifyServiceData,
        id: selectedService.id, // Include the id in the request body
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success, e.g., update state, close modal
        
        setUpdateTrigger((prev) => !prev);
        handleClose();
      })
      .catch((error) => {
        // Handle error
        alert("Error modifying service:", error);
      });
  };
  const handleDeleteClick = (service)=>{
    
    if(service){
      fetch(`http://localhost:9000/.netlify/functions/api/delTech`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          technoId: service.id, // Include the id in the request body
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle success, e.g., update state, close modal
          alert("Service deleted successfully:", data);
          setUpdateTrigger((prev) => !prev);
          handleClose();
        })
        .catch((error) => {
          // Handle error
          alert("Error deleting Service:", error);
        });
    }
  }
  const handleAjoutClick = () => {
    // Reset new blog data
    setNewServiceData({
      title: "",
      description: "",
      image: null,
    });
    setShowAddModal(true);
  };
  const handleAddService = () => {
    console.log(newServiceData)
    // Make API call to addBlog
    fetch("http://localhost:9000/.netlify/functions/api/addTech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newServiceData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Service added successfully:", data);
        setUpdateTrigger((prev) => !prev);
        handleClose();
      })
      .catch((error) => {
        alert("Error adding Service:", error);
      });
  };
  return (
    <div className="tm-section-wrap bg-white">
      
      <section id="work" className="row tm-section">
      <button
                    type="button"
                    className="btn btn-primary mr-2"
                    data-mdb-ripple-init
                    onClick={() => handleAjoutClick()}
                  >
                    Ajouter Un Service
        </button>
        <MDBTable align='middle'>
          <MDBTableHead>
            <tr>
              <th scope='col'>Nom du service</th>
              <th scope='col'>Information</th>
              <th scope='col'>Technologies</th>
              <th scope='col'>Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {Array.isArray(services) &&
              services.map((service) => (
                <tr key={service.id}>
                  <td>
                    <div className='d-flex align-items-center'>
                     
                      <div className=''>
                        <p className='fw-bold '>{service.title}</p>
                        
                      </div>
                    </div>
                  </td>
                  <td>
                  <p className='text-muted mb-0'>{service.description}</p>
                   
                  </td>
                  <td>
                  <img
                        src={`data:image/png;base64, ${service.image}`}
                        alt={service.name}
                        style={{ width: '180px', height: '50px' }}
                      />
                  </td>
                 
                  <td>
                    <MDBBtn color='link' rounded size='sm'
                    onClick={() => handleModifyClick(service)}
                    >
                      Modifier
                    </MDBBtn>
                    <MDBBtn color='link'  rounded size='sm' 
                    onClick = {()=> handleDeleteClick(service)}
                    >
                       Suprimer
                    </MDBBtn>
                  </td>
                </tr>
              ))}
          </MDBTableBody>
        </MDBTable>
        
      </section>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifiez le service - {selectedService?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modifyServiceData && (
            <div>
              <MDBInput
                                label="Nom du service"
                                id="title"
                                type="text"
                                size="lg"
                                name="title"
                                value={modifyServiceData.title}
                                onChange={handleInputChange}
              />
              <br />
              <MDBInput
                label="Description"
                id="description"
                type="text"
                name="description"
                value={modifyServiceData.description}
                onChange={handleInputChange}
              />
              <br />
              <MDBFile label="Default file input example" id="customFile" onChange={handleFileChange} />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            fermez
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Enregistrez les modifications
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showAddModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter Un Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <MDBInput
              label="Titre"
              id="title"
              type="text"
              size="lg"
              name="title"
              value={newServiceData.title}
              onChange={(e) =>
                setNewServiceData({ ...newServiceData, title: e.target.value })
              }
            />
            <br />
            <MDBInput
              label="Description"
              id="description"
              type="text"
              name="description"
              value={newServiceData.description}
              onChange={(e) =>
                setNewServiceData({ ...newServiceData, description: e.target.value })
              }
            />
            <br />
            <MDBFile
              label="Default file input example"
              id="customFile"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const base64Data = reader.result.split(',')[1];
                    setNewServiceData({ ...newServiceData, image: base64Data });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddService}>
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
