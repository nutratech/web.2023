<script>
	import '@picocss/pico';
	import Header from './Header.svelte';
</script>

<!-- Head -->
<title>Home Page | NutraTech</title>

<!-- Body -->
<Header />

<main class="container">
	<h1>Home page</h1>
	<p>Welcome!</p>
	<p>Check out the blog, and the calculators.</p>

	<h2>Externals</h2>
	<p>Visit <a rel="external" href="/blog/">/blog/</a> for the blog</p>
	<p>Visit <a rel="external" href="/api/">/api/</a> for API documentation</p>
</main>
