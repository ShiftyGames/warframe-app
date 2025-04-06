---
name: Prime Resurgence
order: 8
---
> This site is currently UNDER CONSTRUCTION!
{: .prompt-warning}
<div class="container mt-5">
<div class="row g-3">
{% for item in site.data.prime_resurgence %}
  <div class="col-md-4">
    <div class="list-group">
      {% include prime-resurgence-task-button.html %}
    </div>
  </div>
{%- endfor -%}
</div>
</div>
