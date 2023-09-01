<script lang="ts">
	import { cn, timeAgo } from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<!-- {@debug data} -->

<!-- <div class="flex justify-between items-center border border-gray-100 shadow-md rounded-lg p-5">
	<div class="grid gap-3">
		<div class="bg-gray-200 animate-pulse rounded-md w-96 h-6" />
		<div class="bg-gray-200 animate-pulse rounded-md w-60 h-4" />
	</div>
	<div class="bg-gray-200 animate-pulse rounded-md w-28 h-4" />
</div> -->

<section class="grid gap-6 mt-10 pt-10 border-t border-gray-300">
	<div class="flex flex-col gap-12">
		{#each data.jobs as job (job.name)}
			<div class="flex flex-col gap-6">
				<!-- <div class="flex justify-between items-center" /> -->
				{#if job.status === 'idle'}
					<div
						class={cn(
							'flex flex-col gap-3 border border-gray-100 shadow-md rounded-lg p-5 relative z-10 bg-white transition-transform'
						)}
					>
						<h2 class="text-3xl font-semibold tracking-tight">{job.displayName}</h2>
						<div class="bg-gray-200 animate-pulse rounded-md w-96 h-6" />
						<div class="flex flex-1 justify-between">
							<div class="bg-gray-200 animate-pulse rounded-md w-28 h-6" />
							<div class="bg-gray-200 animate-pulse rounded-md w-28 h-6" />
						</div>
					</div>
				{:else}
					<div class="relative">
						<div
							class={cn(
								'flex flex-col gap-3 border border-gray-100 shadow-md rounded-lg p-5 relative z-10 bg-white transition-transform',
								job.status === 'error' && 'hover:-translate-y-9'
							)}
						>
							<h2 class="text-3xl font-semibold tracking-tight">{job.displayName}</h2>
							<p class="text-gray-600 hover:text-black transition-all">
								{job.description}
							</p>
							<div class="flex flex-1 justify-between">
								<p>
									Status:{' '}
									<span
										class={cn(
											'font-bold uppercase',
											job.status === 'ok' ? 'text-green-500' : 'text-red-500'
										)}>{job.status}</span
									>
								</p>
								<p>perfomed {timeAgo(job.timestamp)}</p>
							</div>
						</div>
						<div
							class="bg-red-400 absolute inset-0 rounded-lg border border-gray-100 flex items-end px-5 py-2 text-red-800 font-bold"
						>
							<p>{job.error}</p>
						</div>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</section>
