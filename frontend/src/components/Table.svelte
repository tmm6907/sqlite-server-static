<script>
    import { queryResults } from "../stores/queryResults";
    let rows = [];
    let cols = [];
    let pks = [];
    let orderedCols = [];
    queryResults.subscribe((value) => {
        rows = value.results;
        cols = rows.length > 0 ? Object.keys(rows[0]) : [];
        pks = value.pks;
        cols = cols.filter((col) => !new Set(pks).has(col));
        orderedCols = [...pks, ...cols];
        console.log("Query Results: ", {
            pks: pks,
            rows: rows,
            cols: orderedCols,
        });
    });
</script>

<div class="outline min-h-128 rounded my-4 max-h-144 overflow-auto">
    <table id="main-db" class="table table-pin-rows active">
        <!-- head -->
        <thead>
            <tr>
                {#if cols.length > 0}
                    {#each orderedCols as col}
                        <th>{col}</th>
                    {/each}
                {/if}
            </tr>
        </thead>
        <tbody>
            {#each rows as row}
                <tr class="hover">
                    {#if row}
                        <td>{row["id"]}</td>
                        {#each Object.keys(row) as key, index}
                            {#if key != "id"}
                                <td>{row[key]}</td>
                            {/if}
                        {/each}
                    {/if}
                </tr>
            {/each}
        </tbody>
    </table>
</div>
