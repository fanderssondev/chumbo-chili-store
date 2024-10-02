<script lang="ts">
	interface Props {
		fillPercentage: number;
	}

	let { fillPercentage }: Props = $props();
</script>

<svg width="138" height="26" viewBox="0 0 138 26" fill="none" xmlns="http://www.w3.org/2000/svg">
	{#each [1, 2, 3, 4, 5] as _, i}
		<!-- Define a mask to control partial fill for the star at index {i} -->
		<defs>
			<clipPath id="clip-{i}">
				<rect
					x={i * 28 + 1}
					y="0"
					width={Math.min(1, Math.max(0, fillPercentage - i)) * 25}
					height="26"
				/>
			</clipPath>
		</defs>

		<!-- Star outline -->
		<path
			d="M{13 + i * 28} 1L{16.708 + i * 28} 8.89905L{25 + i * 28} 10.1735L{19 +
				i * 28} 16.3186L{20.416 + i * 28} 25L{13 + i * 28} 20.8991L{5.584 + i * 28} 25L{7 +
				i * 28} 16.3186L{1 + i * 28} 10.1735L{9.292 + i * 28} 8.89905L{13 + i * 28} 1Z"
			stroke="black"
			stroke-linecap="round"
			stroke-linejoin="round"
			fill="transparent"
		/>

		<!-- Star fill using the clipPath for partial fill -->
		<path
			d="M{13 + i * 28} 1L{16.708 + i * 28} 8.89905L{25 + i * 28} 10.1735L{19 +
				i * 28} 16.3186L{20.416 + i * 28} 25L{13 + i * 28} 20.8991L{5.584 + i * 28} 25L{7 +
				i * 28} 16.3186L{1 + i * 28} 10.1735L{9.292 + i * 28} 8.89905L{13 + i * 28} 1Z"
			stroke="none"
			fill="yellow"
			clip-path="url(#clip-{i})"
		/>
	{/each}
</svg>
