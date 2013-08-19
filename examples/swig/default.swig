{{ layout('layout') }}

<header>
	<nav>navigation code</nav>
</header>

{% autoescape false %}{{ content() }}{% endautoescape %}
