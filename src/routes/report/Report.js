const reportTable = require("./table");
const typeTable = require("../types/table");
const { uuid } = require("uuidv4");
const { b64toBlob, blobToBase64 } = require("../../services/tools");

class Report {
	constructor({
		id,
		userId,
		title,
		description,
		typeId,
		type,
		subTypes,
		image,
		audio,
		latitude,
		longitude,
	}) {
		this.id = id;
		this.title = title;
		this.userId = userId;
		this.description = description;
		this.typeId = typeId;
		this.type = null;
		this.subTypes = subTypes;
		this.image = image;
		this.audio = audio;
		this.latitude = latitude;
		this.longitude = longitude;
	}

	async criar() {
		let treatedImage = null,
			treatedAudio = null;
		if (this.image) {
			treatedImage = await b64toBlob(this.image);
		}
		if (this.audio) {
			treatedAudio = await b64toBlob(this.audio);
		}
		const result = await reportTable.inserir({
			id: uuid(),
			title: this.title,
			userId: this.userId,
			description: this.description,
			typeId: this.typeId,
			image: treatedImage,
			audio: treatedAudio,
			subTypes: this.subTypes.join(", "),
			latitude: this.latitude,
			longitude: this.longitude,
		});
		const type = await typeTable.getById(this.typeId);
		this.type = type;

		this.id = result.id;
		this.createdAt = result.createdAt;
		this.updatedAt = result.updatedAt;
	}

	async byId() {
		const result = await reportTable.getById(this.id);
		let treatedImage = null,
			treatedAudio = null;
		if (result.image) {
			blobToBase64(result.image, (base64) => (treatedImage = base64));
		}
		if (result.audio) {
			blobToBase64(result.audio, (base64) => (treatedAudio = base64));
		}

		this.id = result.id;
		this.typeId = result.typeId;
		let type = await typeTable.getById(this.typeId);
		type = {
			id: type.id,
			typeName: type.typeName,
			subTypes: type.subTypes.split(", "),
			createdAt: type.createdAt,
			updatedAt: type.updatedAt,
		};
		this.latitude = result.latitude;
		this.longitude = result.longitude;
		this.type = type;
		this.userId = result.userId;
		this.description = result.description;
		this.subTypes = result.subTypes.split(", ");
		this.createdAt = result.dataCriacao;
		this.updatedAt = result.updatedAt;
		this.image = treatedImage;
		this.audio = treatedAudio;
	}

	async update() {
		const result = await reportTable.getById(this.id);
		const fields = ["title", "description", "typeId", "subTypes"];
		const updatedData = {};

		fields.forEach((field) => {
			const valor = this[field];
			if (valor.length > 0) {
				if (field === "subTypes") {
					updatedData[field] = valor.join(", ");
				} else {
					updatedData[field] = valor;
				}
			}
		});

		if (Object.keys(updatedData).length < 1) {
			throw new Error();
		}

		reportTable.update(this.id, {
			...updatedData,
			updatedAt: new Date().toISOString(),
		});
	}

	async remove() {
		return reportTable.remove(this.id);
	}
}

module.exports = Report;
