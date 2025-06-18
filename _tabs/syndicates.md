---
name: Syndicates
order: 10
---
> This site is currently UNDER CONSTRUCTION!
{: .prompt-warning}
{% for syndicate in site.data.syndicates -%}
  {% assign syndicate_id = syndicate.name | downcase | replace: "'", "_" | split: ' ' | join: '_' -%}
  <hr style="border: 1px solid #000;">
  <div class="d-grid gap-2">
    <button class="btn"
       data-bs-toggle="collapse"
       data-bs-target="#collapse_{{ syndicate_id }}"
       type="button"
       aria-expanded="true"
       aria-controls="collapse_{{ syndicate_id }}">
        {{ syndicate.name }}
    </button>
  </div>
  <div class="container mt-5 collapse show" id="collapse_{{ syndicate_id }}">
  <div class="row g-3">
  {% for item in syndicate.ranks -%}
    <div class="col-md-4">
      <div class="list-group">
    {% include syndicate-task-button.html -%}
      </div>
    </div>
  {% endfor -%}
  </div>
  </div>
{% endfor -%}
