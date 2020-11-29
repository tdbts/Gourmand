const DAO = require('./DAO');
const dao = new DAO();

dao.initialize()
	.then(() => dao.findRestaurantByID("JQVk3sE7cSXDQaQpoTuFQQ"))
	.then(result => console.log("result:", result))
	.catch(e => console.log("e:", e));