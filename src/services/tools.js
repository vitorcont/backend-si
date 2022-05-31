const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));

const b64toBlob = async (b64Data) => {
	console.log("AAAA");
	const data = await fetch(b64Data);
	console.log("BBB", data);
	return data.blob();
};

const blobToBase64 = (blob, callback) => {
	const reader = new FileReader();
	reader.onload = () => {
		const base64 = reader.result;
		callback(base64);
	};
	reader.readAsDataURL(blob);
};

module.exports = { b64toBlob, blobToBase64 };
