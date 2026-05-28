---
name: Maintenance Cycle/FOSSA Template
about: Maintenance Cycle
title: Maintenance Cycle
labels: important, maintenance
assignees: ''

---

Outline the steps needed when performing maintenance on the front-end. Maintenance should be performed on a regular schedule to ensure the front-end is up to date and secure. 

**Tasks:**
A list of tasks to be completed for the maintenance cycle. The following steps should take place each cycle.

- [ ] Check FOSSA for new vulnerabilities and updates. Priority should be given to Critical and High vulnerabilities.
- [ ] Determine which packages to update and list them
~- [ ] List the ignored updates in the **Ignore** section of this ticket along with the reason for ignoring~
- [ ] Organize additional maintenance tickets to be completed, if needed

**Packages to Update:**

- List of packages requiring an update

~**Ignore:**~
~- A list of tasks to be ignored. For example, a dependency that does not have a current fix (placeholder for future)~

**Related Github Issues:**

- Issues that contain similar work but are not blocking or being blocked by the current issue.

**Related links:**

- These links can consist of resources, bugherds, etc.

**Needed for merging:**
If an item on the list is not needed, it should be crossed off but not removed.

- [ ] Execute any testing required
- [ ] Test the build
- [ ] Update documentation, if needed

**Notes:**
Notes from the developer on this maintenance cycle.
