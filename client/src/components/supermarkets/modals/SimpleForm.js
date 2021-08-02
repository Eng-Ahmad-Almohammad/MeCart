import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import configuration from "../../../config";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const SimpleForm = (props) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: configuration.googleMapAPI,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const { handleSubmit, pristine, reset, submitting } = props;

  const [selectedFile, setSelectedFile] = useState(null);

  // On file select (from the pop up)
  const onFileChange = (event) => {
    // Update the state
    setSelectedFile(event.target.files[0]);
  };

  // On file upload (click the upload button)
  const onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("myFile", selectedFile);

    // Details of the uploaded file
    console.log("the file that we selected ",selectedFile);

    // Request made to the backend api
    // Send formData object
    
    // axios.post("api/uploadfile", formData);
  };

  return (
    <form onSubmit={handleSubmit((val) => props.onNewListSubmit(val))}>
      <div>
        <label>Owner</label>
        <div>
          <Field
            name="owner"
            component="input"
            type="text"
            placeholder="Owner"
          />
        </div>
      </div>
      <div>
        <label>Name</label>
        <div>
          <Field
            name="name"
            component="input"
            type="text"
            placeholder="Store Name"
          />
        </div>
      </div>
      <div>
        <label>Address</label>
        <div>
          <Field
            name="address"
            component="input"
            type="text"
            placeholder="Address"
          />
        </div>
      </div>
      <div>
        <label>Number</label>
        <div>
          <Field
            name="number"
            component="input"
            type="text"
            placeholder="Number"
          />
        </div>
      </div>
      <div>
        <label>Business Info</label>
        <div>
          <Field
            name="businessInfo"
            component="input"
            type="text"
            placeholder="Business Information"
          />
        </div>
      </div>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      )}
      <div>
        <label>Email</label>
        <div>
          <Field
            name="email"
            component="input"
            type="text"
            placeholder="Email"
          />
        </div>
      </div>
      <div>
        <label>Rank</label>
        <div>
          <Field style={{display: 'inline-block'}} name="rank" component="select">
            <option></option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Field>
        </div>
      </div>
      <div>
        <label>Logo</label>
        <div>
          <input type="file" onChange={onFileChange} />
          <button onClick={onFileUpload}>Upload!</button>
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "simple",
})(SimpleForm);
