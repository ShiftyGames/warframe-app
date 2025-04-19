---
name: Codex
order: 12
---
> This site is currently UNDER CONSTRUCTION!
{: .prompt-warning}
{% assign item_types = "warframes vehicles weapons companions mods" | split: " " %}
{% for item_type in item_types %}
  <hr style="border: 1px solid #000;">
  <div class="d-grid gap-2">
    <button class="btn"
       data-bs-toggle="collapse"
       data-bs-target="#collapse_{{ item_type }}"
       type="button"
       aria-expanded="true"
       aria-controls="collapse_{{ item_type }}">
        {{ item_type  | capitalize }}
    </button>
  </div>
  <div class="container mt-5 collapse show" id="collapse_{{ item_type }}">
  <div class="row g-3">
  {% assign items = site.data.codex[item_type] %}
  {% if items.size > 0 %}
  {% for item in items -%}
    <div class="col-md-4">
      <div class="list-group">
      {% include codex-task-button.html -%}
      </div>
    </div>
  {% endfor -%}
  {% else %}
    <div>None</div>
  {% endif %}
  </div>
  </div>
{% endfor %}
