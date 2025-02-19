<script>
    import { queryResults } from "../stores/queryResults";
    let rows = [];
    let cols = [];
    queryResults.subscribe((value) => {
        rows = value;
        cols = rows.length > 0 ? Object.keys(rows[0]) : [];
    });
</script>

<table id="main-db" class="table active">
    <!-- head -->
    <thead>
        <tr>
            {#each cols as col}
                <th>{col}</th>
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each rows as row}
            <tr class="hover">
                {#each Object.keys(row) as key}
                    <td>{row[key]}</td>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>
