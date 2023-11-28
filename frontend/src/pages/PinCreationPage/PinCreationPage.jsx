import Label from '../../components/Label/Label';


const PinCreationPage = () => {
  return(
    <section className="pin-creation-page">
      <div className="pin-creation-container">
        <div className="upload-content center">
          <img src={require('../../assets/arrow-up.png')} alt="Arrow up"/>
          <p className="text-wrapper">Drag and drop or click to upload an image</p>
        </div>
        <form className="pin-creation-form">
          <div className="title"><Label name={"title"} text={"Add a title"} noBorderOutline={true}/></div>
          <div className="description"><Label name={"description"} text={"Add a description"} noBorderOutline={true}/></div>
          <div className="alt-description"><Label name={"alt-description"} text={"Add an alt description"} noBorderOutline={true}/></div>
          <div><Label name={"url"} text={"Add a link"} noBorderOutline={true}/></div>
          <button className="submit-btn">Save</button>
        </form>
      </div>
    </section>
  )
};

export default PinCreationPage;