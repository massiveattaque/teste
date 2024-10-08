window.addEventListener("DOMContentLoaded", () => {
	const c = new DateDisplay(".clock");
});

class DateDisplay {
	constructor(el) {
		this.el = document.querySelector(el);
		this.init();
	}

	init() {
		this.updateDate();
	}

	// Retorna a data atual como um objeto
	get currentDate() {
		const date = new Date();
		const day = date.getDate();
		const month = date.getMonth();
		const year = date.getFullYear();
		return { day, month, year };
	}

	// Converte a data em palavras
	get dateInWords() {
		const { day, month, year } = this.currentDate;

		// Mapeamento dos números e meses para palavras
		const days = ["primeiro", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove", "vinte", "vinte e um", "vinte e dois", "vinte e três", "vinte e quatro", "vinte e cinco", "vinte e seis", "vinte e sete", "vinte e oito", "vinte e nove", "trinta", "trinta e um"];

		const months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

		const years = {
			2000: "dois mil",
			2024: "dois mil e vinte e quatro",
			// Adicione mais anos conforme necessário
		};

		const dayWord = days[day - 1]; // Extrai o dia em palavras
		const monthWord = months[month]; // Extrai o mês em palavras
		const yearWord = years[year] || year.toString(); // Extrai o ano em palavras ou usa o número diretamente

		// Monta a data por extenso
		return `dia ${dayWord} de ${monthWord} de ${yearWord}`;
	}

	// Atualiza a data no DOM
	updateDate() {
		const flyInClass = "clock__word--fade-fly-in";
		const dateWords = this.dateInWords.split(" "); // Divide a data em palavras

		const dateWordEls = Array.from(this.el.querySelectorAll(".clock__word"));

		for (let i = 0; i < dateWordEls.length; ++i) {
			const wordEl = dateWordEls[i];
			wordEl.innerText = dateWords[i] || ""; // Atualiza o texto
			if (dateWords[i] !== this.dateWords[i]) wordEl.classList.add(flyInClass);
			else wordEl.classList.remove(flyInClass);
		}

		this.dateWords = dateWords;
		setTimeout(this.updateDate.bind(this), 1e4); // Atualiza a data a cada 10 segundos
	}
}
