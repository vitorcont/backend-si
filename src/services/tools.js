const Blob = (base64) => {
  const base64Response = await fetch(base64);

  return base64Response.blob();
};

module.exports = { Blob };
