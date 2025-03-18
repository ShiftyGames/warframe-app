import argparse
import json
import logging
import os
from typing import Any

import jinja2

LOG = logging.getLogger()


class WarframeApp:
    context: dict[str, Any]
    env: jinja2.Environment

    def __init__(self) -> None:
        self.context = {
            "prime_resurgence": [
                {
                    "wf_id": "wisp_prime",
                    "wf_name": "Wisp Prime",
                },
                {
                    "wf_id": "ash_prime",
                    "wf_name": "Ash Prime",
                },
            ]
        }
        self.env = jinja2.Environment(
            loader=jinja2.FileSystemLoader("warframe-app"),
            autoescape=jinja2.select_autoescape(),
        )
        self.load_context()

    def render(self, template_filename: str, out_filename: str) -> None:
        LOG.debug(f"rendering {template_filename=}")
        # remove the 'warframe-app' prefix
        dirs = os.path.normpath(template_filename).split(os.path.sep)[1:]
        template_filename = "/".join(dirs)

        template_filename = template_filename.lstrip("warframe-app")
        template = self.env.get_template(template_filename)

        with open(out_filename, mode="w", encoding="utf-8") as output:
            output.write(template.render(self.context))

    def load_context(self) -> None:
        with open("warframe-app/data/template-context.json") as f:
            self.context = json.load(f)
            tabs: [str] = self.context["tabs"]
            tabs = [
                {
                    "id": "_".join(tab.split()).lower(),
                    "name": tab,
                }
                for tab in tabs
            ]
            self.context["tabs"] = tabs


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--template-file", type=str)
    parser.add_argument("--site-file", type=str)
    args = parser.parse_args()

    LOG.debug(args)
    site_dir = os.path.dirname(args.site_file)
    os.makedirs(site_dir, exist_ok=True)

    app = WarframeApp()
    app.render(args.template_file, args.site_file)
