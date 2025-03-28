---
name: Prime Resurgence
order: 7
---

{% for item in site.data.prime_resurgence -%}
  - [ ] {{ item.name }}
  {% for part in item.parts %}
    - [ ] {{ part }}
  {% endfor %}
{% endfor -%}
