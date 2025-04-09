---
name: Weekly
order: 5
---
> This site is currently UNDER CONSTRUCTION!
{: .prompt-warning}
{% for day in site.data.weekly -%}
  {% assign day_id = day.name | downcase | split: ' ' | join: '_' -%}
  <hr style="border: 1px solid #000;">
  <div class="d-grid gap-2">
    <button class="btn"
       data-bs-toggle="collapse"
       data-bs-target="#collapse_{{ day_id }}"
       type="button"
       aria-expanded="true"
       aria-controls="collapse_{{ day_id }}">
        {{ day.name }}
    </button>
  </div>
  <div class="container mt-5 collapse show" id="collapse_{{ day_id }}">
  <div class="row g-3">
  {% for item in day.subtasks -%}
  <div class="col-md-4">
    <div class="list-group">
      {% include weekly-task-button.html -%}
    </div>
  </div>
  {% endfor %}
  </div>
  </div>
{% endfor %}

