<h1>use standard layout</h1>

<div>
	{% autoescape false %}{{ partial('partial1') }}{% endautoescape %}
</div>
<div>
	{% autoescape false %}{{ partial('partial2.swig') }}{% endautoescape %}
</div>
