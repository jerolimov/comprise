{{ layout('default') }}<h1>use layout</h1>

<div>
	{% autoescape false %}{{ partial('partial1') }}{% endautoescape %}
</div>
<div>
	{% autoescape false %}{{ partial('partial2.swig') }}{% endautoescape %}
</div>
