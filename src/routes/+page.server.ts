
import { openAi } from '../openAi';
import type { CharacterResponse } from '../types/charResponse';

export const config = {
	runtime: 'edge',
  };

/** @type {import('./$types').Actions} */
export const actions = {
	makeApiRequest: async ({ cookies, request }: any) => {
		const data = await request.formData();
		const name = data.get('name');
		const alignment = data.get('alignment');
		const race = data.get('race');
		const dndClass = data.get('class');
		const charDescription = data.get('charDescription');
		console.log(data);
		let result;
		if (name && alignment) {
			result = await makeRequest(name, alignment, race, dndClass, charDescription);
		}
		// add request here
		return result;
	}
};

const makeRequest = async (
	charName: string,
	alignment: string,
	race: string,
	dndClass: string,
	charDescription: string
) => {
	const dndInfo = `Name: ${charName}, Alignment: ${alignment}, Race: ${race}, Class: ${dndClass}, CharDescription: ${charDescription}`;
	const promt = `You are a dnd player specialized in creating fun characters with interesting backgrounds and personalities. 
	Based on the given charcter information which is delimited by double dashes you should create the following: 
	A short summary of the character in the style of the writer joe abercrombie. No more than 100 words long. 
	You should also create a 4 personality traits and explain them. You should also create a term personal 
	objective that gives the player a purpose that he can do whilst exploring the world that can lead to character growth. 
	You should also create a promt to generate a image based on the summary
	
	The answer should be in the json format with keys name, alignment, race, class, summary, personality_traits, personal_quest, imagePromt. 
	Character info: --${dndInfo}--`;
	try {
		const response = await openAi.createChatCompletion(
			{
				model: 'gpt-3.5-turbo',
				messages: [
					{
						role: 'user',
						content: promt
					}
				],
				temperature: 0
			},
		
		);
		console.log(response.data.choices[0].message?.content);
		if (response.data.choices[0].message?.content) {
			let imageUrl = '';
			const charObj: CharacterResponse = JSON.parse(response.data.choices[0].message?.content);
			const imagePromt = `a zoomed out full avatar photo of a ${charObj.race} that is a ${charObj.class}. The face should be centered in the image. In addition use the following character description:  ${charObj.imagePromt}`;
			const imageResponse = await openAi.createImage(
				{
					prompt: imagePromt,
					size: '512x512'
				},
			);
			imageUrl = imageResponse.data.data[0].url || "";
			return { charObj, imageUrl };
		}
	} catch (error) {
		console.log(error);
	}
};
