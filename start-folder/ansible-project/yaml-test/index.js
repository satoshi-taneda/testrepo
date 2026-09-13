import YAML from "yaml";
import { writeFileSync } from "node:fs";

const playbook = [
  {
    name: "Hello from bun",
    hosts: "targets",
    gather_facts: false,
    tasks: [
      {
        name: "Get hostname",
        "ansible.builtin.command": "hostname"
      }
    ]
  }
];

const yaml = YAML.stringify(playbook);
const fileName = "hello.yml"

writeFileSync(fileName, yaml);

console.log(`${fileName} was created`);
