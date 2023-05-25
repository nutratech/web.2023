<script>
	import '@picocss/pico';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';

	import { page } from '$app/stores';
	import { STORE_URL } from './constants.ts';

	let apiUrl = 'api.' + $page.url.hostname;
	apiUrl === 'api.localhost' ? (apiUrl = `http://127.0.0.1:20000`) : (apiUrl = `https://${apiUrl}`);
	console.info(apiUrl);
</script>

<!-- Head -->
<svelte:head>
	<title>Home Page | NutraTech</title>
	<!-- <meta name="viewport" content="width=device-width, initial-scale=1" /> -->
	<meta name="description" content="Nutritional information, bio-hacking, blog, store." />
</svelte:head>

<!-- Body -->
<Header />

<main class="container">
	<h1>Home page</h1>
	<p>Welcome!</p>
	<p>Check out the calculators, blog, and store.</p>

	<p>
		You can find download instructions for the <code>nutra CLI</code> on the
		<a href="/calculators/">/calculators</a> page.
	</p>

	<h2>Links</h2>
	<p>Visit <a rel="external" href="/blog">/blog</a> for the blog</p>
	<p>Visit <a rel="external" href={STORE_URL}>{STORE_URL}</a> for the store</p>
	<p>Visit <a href={apiUrl}>{apiUrl}</a> for API documentation</p>

	<Footer />
</main>
