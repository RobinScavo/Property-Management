const fetchProperties = async () => {
    let uri = 'http://localhost:3000/properties';

    const res = await fetch(uri);
    const properties = await res.json();
    console.log(properties);
    return properties;
}
