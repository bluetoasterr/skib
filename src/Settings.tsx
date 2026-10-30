import React from 'react';
import { View, Text, TextInput, Switch, Image, ScrollView } from 'react-native';
import { storage } from '@vendetta/plugin';

const hex = (s: string) => /^#[0-9a-fA-F]{6}$/.test(s);
const extractId = (value: string) => {
  const match = value.match(/<(?:a)?:[^:>]+:(\d{15,22})>/) || value.match(/^(\d{15,22})$/);
  return match?.[1] ?? '';
};
export default function Settings() {
  const [, refresh] = React.useReducer((n: number) => n + 1, 0);
  const change = (key: string, value: any) => { storage[key] = value; refresh(); };
  const field = (title: string, key: string, hint: string) => (
    <View style={{marginBottom: 16}}>
      <Text style={{color: '#fff', marginBottom: 6}}>{title}</Text>
      <TextInput value={String(storage[key] ?? '')} placeholder={hint}
        placeholderTextColor="#999" autoCapitalize="none"
        onChangeText={v => change(key, v)}
        style={{color:'#fff',backgroundColor:'#34343c',padding:12,borderRadius:8}} />
    </View>
  );
  const id = extractId(String(storage.emojiId ?? ''));
  const name = 'Your username';
  const first = hex(storage.start) ? storage.start : '#ff66cc';
  const last = hex(storage.end) ? storage.end : '#9966ff';
  return <ScrollView contentContainerStyle={{padding:16}}>
    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:18}}>
      <Text style={{color:'#fff'}}>Enable local appearance</Text>
      <Switch value={!!storage.enabled} onValueChange={v => change('enabled',v)} />
    </View>
    {field('Gradient start (#RRGGBB)', 'start', '#ff66cc')}
    {field('Gradient end (#RRGGBB)', 'end', '#9966ff')}
    {field('Fallback icon (Unicode emoji or symbol)', 'icon', '✦')}
    {field('Icon color (#RRGGBB, applies to text symbol only)', 'iconColor', '#ffffff')}
    {field('Custom server emoji ID or <:name:id> / <a:name:id>', 'emojiId', '<:emoji:123456789012345678>')}
    <Text style={{color:'#aaa',marginBottom:8}}>Preview (not a live Discord rendering patch)</Text>
    <View style={{flexDirection:'row',alignItems:'center',padding:12,backgroundColor:'#232329',borderRadius:8}}>
      {id ? <Image source={{uri:`https://cdn.discordapp.com/emojis/${id}.png?size=48`}} style={{width:22,height:22,marginRight:6}} /> :
        <Text style={{color:hex(storage.iconColor)?storage.iconColor:'#ffffff',marginRight:6}}>{storage.icon}</Text>}
      {Array.from(name).map((c,i) => <Text key={i} style={{color:i<name.length/2?first:last}}>{c}</Text>)}
    </View>
    <Text style={{color:'#aaa',marginTop:12}}>Server emoji images retain their original colors; they cannot be recolored like a text symbol. Some emoji may not load if unavailable to your account.</Text>
  </ScrollView>;
}
