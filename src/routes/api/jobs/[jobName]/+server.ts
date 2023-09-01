import jober from '$lib/jober';
import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params: { jobName } }) {
	if (!jober.hasJob(jobName)) throw error(404, 'Job not found');

	const result = await jober.runJob(jobName);

	if (!result) {
		throw error(500, `Job "${jobName}" failed`);
	}

	return json(
		{
			message: `ok`
		},
		{
			status: 200
		}
	);
}
