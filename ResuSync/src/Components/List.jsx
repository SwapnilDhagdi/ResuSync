function List(props){
    console.log("Props got" +props.result);
    
    return (
       props.result.map(data=><li key={data.id}> "Name "{data.name} " Email: "{data.email}</li>)
    );
}
export default List