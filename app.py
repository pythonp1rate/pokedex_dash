import streamlit as st
import pandas as pd
import plotly.express as px

df = pd.read_csv("Pokemon.csv")

st.image("pokemonindex.png", width=400)
st.subheader("What's your favorite Pokémon?")

search = st.text_input("What's your favorite Pokémon?", placeholder="Catch your Pokémon!", label_visibility="collapsed")

if search:
    result = df[df["Name"].str.contains(search, case=False, na=False)]
    if result.empty:
        st.warning("No Pokémon found!")
    else:
        for i in range(len(result)):
            row = result.iloc[i]
            st.write("---")
            col1, col2 = st.columns([1, 2])
            
            with col1:
                st.subheader(row["Name"])
                if 'Total' in row:
                    st.metric("Base Stat Total", int(row['Total']))
            
            with col2:
                display_cols = ['Type1', 'Type2', 'Generation', 'HP',
                                'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed']
                pokemon_df = pd.DataFrame({
                    'Property': display_cols,
                    'Value': [row[col] for col in display_cols]
                })
                st.dataframe(pokemon_df, hide_index=True, height=350)

st.sidebar.header("Trainer's Pokémon Filters")

type_options = sorted(df["Type1"].dropna().unique().tolist())
type_filter = st.sidebar.multiselect("Select Pokémon Types", type_options, default=type_options)

hp_min = int(df["HP"].min())
hp_max = int(df["HP"].max())
hp_range = st.sidebar.slider("HP Range", hp_min, hp_max, (hp_min, hp_max))

filtered_df = df.copy()

if type_filter:
    filtered_df = filtered_df[filtered_df["Type1"].isin(type_filter)]

filtered_df = filtered_df[(filtered_df["HP"] >= hp_range[0]) & (filtered_df["HP"] <= hp_range[1])]

st.sidebar.metric("Total Pokémon Selected", len(filtered_df))

if 'Total' in filtered_df.columns:
    median_stat = filtered_df['Total'].median()
    st.metric("Median Pokémon Power", f"{median_stat:.2f}")

st.subheader("Complete Pokédex")
st.dataframe(df, hide_index=True)

st.subheader("Attack vs Defense Scatter Plot")
st.caption("These battle statistics reflect your current Pokémon selection. Adjust your filters to analyze different groups and discover new patterns!")

fig_strip = px.scatter(
    filtered_df,
    x="Type1",           
    y="Attack",           
    color="Type1",        
    hover_data=["Name", "Defense", "HP", "Total"],
    color_discrete_sequence=px.colors.qualitative.Safe,
    opacity=0.7,          
    size_max=12           
)

fig_strip.update_layout(
    height=600,
    yaxis_title="Attack",
    xaxis_title="Pokémon Type",
    font=dict(size=16),
    showlegend=False
)
st.plotly_chart(fig_strip, use_container_width=True)

csv = filtered_df.to_csv(index=False).encode('utf-8')
st.download_button(label="Download filtered data as CSV", data=csv, file_name="filtered_pokemon.csv", mime="text/csv")