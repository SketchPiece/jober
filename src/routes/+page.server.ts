import jober, { prefix, type JobStatus } from '$lib/jober';
import kv from '$lib/kv';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const jobNames = jober.getJobNames();
	const jobs = await Promise.all(
		jobNames.map(async (jobName) => {
			const jobInfo = jober.getJobInfo(jobName);
			const jobStatus = await kv.get<JobStatus>(`${prefix}:${jobName}`);
			return {
				name: jobName,
				displayName: jobInfo.name,
				description: jobInfo.description,
				...jobStatus,
				status: jobStatus?.status ?? 'idle'
			};
		})
	);
	console.log(jobs);

	return {
		jobs
	};
}) satisfies PageServerLoad;
