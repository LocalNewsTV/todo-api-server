export const getItemsFromList = (req, res) => {
  res.status(200).send('Successful API GET Request');
}

export const addItemToList = async (req, res) => {
  res.status(200).send('Successful API POST Request.');
}

export const removeOneItemFromList = async ( req, res ) => {
  res.status(200).send('Successful API Delete Request');
}