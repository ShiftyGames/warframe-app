---
name: Baro Ki'Teer
order: 11
---
> This site is currently UNDER CONSTRUCTION!
{: .prompt-warning}
{% assign offer_types = "weapon mod companion" | split: " " %}
{% for offer_type in offer_types %}
  <hr style="border: 1px solid #000;">
  <div class="d-grid gap-2">
    <button class="btn"
       data-bs-toggle="collapse"
       data-bs-target="#collapse_{{ offer_type }}"
       type="button"
       aria-expanded="true"
       aria-controls="collapse_{{ offer_type }}">
        {{ offer_type }}s
    </button>
  </div>
  <div class="container mt-5 collapse show" id="collapse_{{ offer_type }}">
  <div class="row g-3">
  {% assign offers = site.data.void_trader.inventory | where: "type", offer_type %}
  {% if offers.size > 0 %}
  {% for offer in offers -%}
    <div class="col-md-4">
      <div class="list-group">
      {% include void-trader-task-button.html -%}
      </div>
    </div>
  {% endfor -%}
  {% else %}
    <div>None</div>
  {% endif %}
  </div>
  </div>
{% endfor %}
