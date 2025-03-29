---
name: Weekly
order: 5
---
<ul class="list-group">
{% for item in site.data.weekly -%}
  {% include task-button.html -%}
{% endfor -%}
</ul>
