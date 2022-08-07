export const formatDate = (originalDate: Date) => {
	if (!originalDate) return 'Não disponível'
	const date1 = new Date(originalDate)
	const date2 = new Date()
	const diffTime = Math.abs(Number(date2) - Number(date1))
	const finalTime = Number((diffTime / 1000 / 60).toFixed(0))
	if (finalTime < 60) {
		return `${finalTime}m`
	}
	if (finalTime >= 60 && finalTime <= 1440) {
		return `${Math.floor(finalTime / 60).toFixed(0)}h`
	}
	if (finalTime > 1440) {
		return `${(finalTime / 60 / 24).toFixed(0)}d`
	}
}

export const handleFeedbackColor = (status: number): string => {
	const SUCCESS: string = "green-500"
	const FAILURE: string = "red-500"
	const verifyFirstChar = (): string => status.toString().charAt(0)
	const availableColors: { [x: string]: string } = {
		"2": SUCCESS,
		"4": FAILURE,
	}
	return availableColors[verifyFirstChar()] ?? "yellow-500"
}

export function cpfMask(value: any) {
	return (
		value &&
		value
			.replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
			.replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d{1,2})/, '$1-$2')
			.replace(/(-\d{2})\d+?$/, '$1')
	) // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}

export function dateMask(value: any) {
	let v = value.replace(/\D/g, '').slice(0, 10)
	if (v.length >= 5) {
		return `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`
	} else if (v.length >= 3) {
		return `${v.slice(0, 2)}/${v.slice(2)}`
	}
	return v
}

export function formatZipCode(cep: any) {
	cep = cep.replace(/\D/g, "")
	cep = cep.replace(/^(\d{5})(\d)/, "$1-$2")
	if (cep.length >= 10) {
		cep = cep.slice(0, 9)
	}
	return cep
}

export function formatToBRL(value: string | number): string {
	return value ? Number(value).toLocaleString("pt-br", {
		style: "currency",
		currency: "BRL",
	}) : 'Não disponível'
}

export function validateCPF(cpf: any) {
	cpf = cpf.replace(/[^\d]+/g, '')
	if (cpf === '') return false
	// Elimina CPFs invalidos conhecidos
	if (cpf.length !== 11 ||
		cpf === '00000000000' ||
		cpf === '11111111111' ||
		cpf === '22222222222' ||
		cpf === '33333333333' ||
		cpf === '44444444444' ||
		cpf === '55555555555' ||
		cpf === '66666666666' ||
		cpf === '77777777777' ||
		cpf === '88888888888' ||
		cpf === '99999999999')
		return false
	// Valida 1o digito
	let add = 0
	let i
	for (i = 0; i < 9; i++)
		add += parseInt(cpf.charAt(i)) * (10 - i)
	let rev = 11 - (add % 11)
	if (rev === 10 || rev === 11)
		rev = 0
	if (rev !== parseInt(cpf.charAt(9)))
		return false
	// Valida 2o digito
	add = 0
	for (i = 0; i < 10; i++)
		add += parseInt(cpf.charAt(i)) * (11 - i)
	rev = 11 - (add % 11)
	if (rev === 10 || rev === 11)
		rev = 0

	return rev === parseInt(cpf.charAt(10))
}

export function formatName(value: any) {
	return value && value.replace(/[^[a-zA-Zà-ú-'\s]/g, '')
}

export function formatCode(value: any) {
	return formatToOnlyDigits(value)
}

export function removePhoneMask(value: any) {
	return formatToOnlyDigits(value)
}

export function formatToOnlyDigits(value: any) {
	return value && value.replace(/[^0-9]+/g, '')
}

export function formatPhone(numero: any) {
	if (!numero) return numero

	numero = numero.replace(/[^0-9]+/g, '')
	if (numero.length > 2) {
		numero = '(' + numero.substring(0, 2) + ') ' + numero.substring(2)
	}
	if (numero.length > 6) {
		numero = numero.substring(0, 6) + ' ' + numero.substring(6)
	}
	if (numero.length > 11) {
		numero = numero.substring(0, 11) + '-' + numero.substring(11, 15)
	} //(XX) X XXXX-XXXX

	return numero
}

export function formatDateString(date: any) {
	const date_arr = date.split('/')

	const dd = date_arr[0]
	const mm = date_arr[1]
	const yyyy = date_arr[2]

	return yyyy + '-' + mm + '-' + dd
}

const INITIAL_PERCENTAGE_TO_HIDE: number = 8
const FINAL_PERCENTAGE_TO_HIDE: number = 1.2

export function hideEmail(email: string) {
	const emailSplitted: string[] = email.split('@')
	return [[...emailSplitted[0]].map((c: string, i: number): string =>
		i >= email.length / INITIAL_PERCENTAGE_TO_HIDE &&
			i <= email.length / FINAL_PERCENTAGE_TO_HIDE
			? `${(i !== emailSplitted[0].length - 1 ? '*' : '*@')}`
			: c
	), ...emailSplitted[1]]
}

export function hideData(data: string) {
	return [...data].map((c, i) =>
		i >= data.length / INITIAL_PERCENTAGE_TO_HIDE &&
			i <= data.length / FINAL_PERCENTAGE_TO_HIDE
			? "*"
			: c
	)
}

const startCeps: any = [
	{ AC: [699, 699] },
	{ AL: [570, 579] },
	{ AM: [690, 692] },
	{ AM2: [694, 698] },
	{ AP: [689, 689] },
	{ BA: [400, 489] },
	{ CE: [600, 639] },
	{ DF: [700, 727] },
	{ DF2: [730, 736] },
	{ ES: [290, 299] },
	{ GO: [728, 729] },
	{ GO2: [737, 767] },
	{ MA: [650, 659] },
	{ MG: [300, 399] },
	{ MS: [790, 799] },
	{ MT: [780, 788] },
	{ PA: [660, 688] },
	{ PB: [580, 589] },
	{ PE: [500, 569] },
	{ PI: [640, 649] },
	{ PR: [800, 879] },
	{ RJ: [200, 289] },
	{ RN: [590, 599] },
	{ RO: [768, 769] },
	{ RR: [693, 693] },
	{ RS: [900, 999] },
	{ SC: [880, 899] },
	{ SE: [490, 499] },
	{ SP: [0o10, 199] },
	{ TO: [770, 779] }
]
const increaserRanger = (diff: any) => {
	let start: number = diff[0]
	let end: number = diff[1]
	let intermediate: number[] = []
	for (start; start < end; start++) {
		intermediate.push(start)
	}
	intermediate.push(end)
	return intermediate

}
let arrayNuns = startCeps.map((data: any) => Object.values(data))
