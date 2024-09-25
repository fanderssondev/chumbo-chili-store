<script lang="ts">
	import type { PageData } from './$types';

	let { data } = $props();
</script>

<pre>
  {JSON.stringify(data.products, null, 2)}
</pre>
