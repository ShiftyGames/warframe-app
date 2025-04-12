---
name: Baro Ki'Teer
order: 11
---
> This site is currently UNDER CONSTRUCTION!
{: .prompt-warning}
  <div class="container mt-5">
  <div class="row g-3">
  {% for offer in site.data.void_trader.inventory -%}
    <div class="col-md-4">
      <div class="list-group">
      {% include void-trader-task-button.html -%}
      </div>
    </div>
  {% endfor -%}
  </div>
  </div>
