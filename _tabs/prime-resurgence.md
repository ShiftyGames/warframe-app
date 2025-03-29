---
name: Prime Resurgence
order: 7
---
<ul class="list-group">
{% for item in site.data.prime_resurgence -%}
  {% include task-button.html -%}
{% endfor -%}
</ul>
