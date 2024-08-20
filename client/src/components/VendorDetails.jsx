function VendorDetails() {
    const [vendor, setVendor] = useState();
    const { vendorId } = useParams();
    
    
    useEffect(() => {
        fetch(`/users/${vendorId}`)
          .then((resp) => {
            if (resp.ok) {
              return resp.json();
            } else {
              //! Fix Error
              throw new Error('Error fetching data');
            }
          })
          .then((data) => {
            setVendor(data);
          })
          .catch((error) => {
          //! Fix Error
            console.log(error);
          });
      }, [vendorId]);
   
   
   return <div>
        <h1>7</h1>
    </div>;
  


}


  export default VendorDetails;