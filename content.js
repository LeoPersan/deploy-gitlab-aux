let query = new URLSearchParams(window.location.search);
let source_branch = query.get('merge_request[source_branch]');
let target_branch = query.get('merge_request[target_branch]');
if (target_branch === null) {
    switch (true) {
        case source_branch.includes("feature"):
            target_branch = "develop";
            break;
        case source_branch.includes("release-sand"):
            target_branch = "sandbox";
            break;
        case source_branch.includes("release-prod"):
            target_branch = "production";
            break;
        case source_branch.includes("release-stg"):
            target_branch = "staging";
            break;
        case source_branch.includes("release"):
            target_branch = "integration";
            break;
        default:
            break;
    }
    query.set('merge_request[target_branch]', target_branch);
    location.search = query.toString();
}
let commit_list = document.getElementsByClassName("commit-list");
let commit_list_text = Array.from(commit_list).map(list => list.innerText).join();
let regex = /HDV-\d+/g;
let matches = commit_list_text.match(regex);
let unique_matches = matches.filter(function (item, pos) {
    return matches.indexOf(item) === pos;
});
unique_matches.sort();
let unique_matches_string = "[" + unique_matches.join("][") + "]";
if (matches.length > 1) {
    document.getElementById("merge_request_title").value = unique_matches_string;
}
document.getElementById("merge_request_description").value = unique_matches_string;