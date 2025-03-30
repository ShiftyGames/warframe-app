---
name: Prime Resurgence
order: 7
---

<script>
    function toggle_bs_task(element) {
        element.classList.toggle("list-group-item-success");
    }
</script>
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
